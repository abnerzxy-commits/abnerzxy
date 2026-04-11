import { NextRequest, NextResponse } from 'next/server'

// --- Rate limiter ---
// Lazy-init Upstash at runtime only (avoid build-time errors)
let _ratelimit: import('@upstash/ratelimit').Ratelimit | null | undefined

async function getRatelimit() {
  if (_ratelimit !== undefined) return _ratelimit
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    _ratelimit = null
    return null
  }
  const { Ratelimit } = await import('@upstash/ratelimit')
  const { Redis } = await import('@upstash/redis')
  _ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '60 s'),
  })
  return _ratelimit
}

// In-memory fallback for local dev / when Upstash is not configured
const memMap = new Map<string, number[]>()

function isMemRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (memMap.get(ip) ?? []).filter(t => now - t < 60_000)
  if (recent.length >= 5) {
    memMap.set(ip, recent)
    return true
  }
  recent.push(now)
  memMap.set(ip, recent)
  if (memMap.size > 500) {
    for (const [key, ts] of memMap) {
      if (ts.every(t => now - t >= 60_000)) memMap.delete(key)
    }
  }
  return false
}

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? 'unknown'
}

/**
 * POST /api/extract
 * Body: { youtube_url: string }
 *
 * Uses YouTube Data API + Claude AI to extract structured spot data
 * from a YouTube travel video about Korea.
 */
export async function POST(req: NextRequest) {
  // CSRF: verify request origin matches host exactly
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (origin && host) {
    try {
      const originHost = new URL(origin).host
      if (originHost !== host) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    } catch {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const ip = getClientIp(req)

  // Rate limit check (Upstash or in-memory fallback)
  const ratelimit = await getRatelimit()
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return NextResponse.json(
        { error: '請求過於頻繁，請稍後再試（每分鐘最多 5 次）' },
        { status: 429 }
      )
    }
  } else if (isMemRateLimited(ip)) {
    return NextResponse.json(
      { error: '請求過於頻繁，請稍後再試（每分鐘最多 5 次）' },
      { status: 429 }
    )
  }

  let body: { youtube_url?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '無效的請求格式' }, { status: 400 })
  }
  const { youtube_url } = body

  if (!youtube_url || typeof youtube_url !== 'string') {
    return NextResponse.json({ error: 'youtube_url required' }, { status: 400 })
  }

  // Input validation: limit URL length to prevent abuse
  if (youtube_url.length > 200) {
    return NextResponse.json({ error: 'URL 太長' }, { status: 400 })
  }

  // Sanitize: only allow expected URL patterns
  if (!/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(youtube_url) && !/^[a-zA-Z0-9_-]{11}$/.test(youtube_url)) {
    return NextResponse.json({ error: '請提供有效的 YouTube 網址' }, { status: 400 })
  }

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

  if (!YOUTUBE_API_KEY || !ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API keys not configured' }, { status: 500 })
  }

  try {
    // 1. Extract video ID from URL
    const videoId = extractVideoId(youtube_url)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    // 2. Fetch video data from YouTube API
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${YOUTUBE_API_KEY}`
    )
    const ytData = await ytRes.json()
    const video = ytData.items?.[0]
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    const { title, description, channelTitle } = video.snippet
    const viewCount = video.statistics?.viewCount ?? 0

    // 3. Fetch top comments
    const commentsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&part=snippet&maxResults=20&order=relevance&key=${YOUTUBE_API_KEY}`
    )
    const commentsData = await commentsRes.json()
    const comments = (commentsData.items ?? [])
      .map((c: { snippet: { topLevelComment: { snippet: { textDisplay: string } } } }) => c.snippet.topLevelComment.snippet.textDisplay)
      .join('\n')

    const rawContent = `影片標題: ${title}\n\n頻道: ${channelTitle}\n觀看次數: ${viewCount}\n\n影片描述:\n${description}\n\n熱門留言:\n${comments}`

    // 4. Send to Claude for extraction (30s timeout)
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      signal: AbortSignal.timeout(30_000),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `你是韓國旅遊資料萃取助理。從以下YouTube影片內容，萃取所有提到的韓國餐廳、景點、咖啡廳等地點。

${rawContent}

請以JSON格式回傳，格式如下：
{
  "spots": [
    {
      "name_zh": "中文名稱",
      "name_ko": "韓文名稱",
      "name_en": "英文名稱（如有）",
      "type": "restaurant|cafe|attraction|shopping|activity",
      "district": "地區（例：弘大、明洞、景福宮）",
      "city": "城市（首爾|釜山|濟州|其他）",
      "description": "50-100字的中文描述",
      "price_range": "budget|moderate|expensive|luxury",
      "avg_price_krw": 數字（可選）,
      "recommended_dishes": [
        {
          "name_zh": "菜名",
          "name_ko": "韓文菜名",
          "price_krw": 數字,
          "description": "描述",
          "must_order": true|false
        }
      ],
      "ordering_tips": ["點餐技巧1", "點餐技巧2"],
      "tips": ["旅遊技巧1"],
      "ticket_price_krw": 數字（景點票價，可選）,
      "ticket_price_free": true|false,
      "tags": ["標籤1", "標籤2"],
      "confidence": 0.0-1.0
    }
  ],
  "source": {
    "youtube_url": "${youtube_url}",
    "title": "影片標題",
    "creator": "頻道名稱",
    "view_count": 數字
  }
}

注意：
- 只萃取有足夠資訊的地點（confidence > 0.6）
- 如果某個欄位不確定，可以省略
- 菜名務必附上韓文
- 所有描述使用繁體中文`,
          },
        ],
      }),
    })

    const claudeData = await claudeRes.json()
    const responseText = claudeData.content?.[0]?.text ?? ''

    // Parse JSON from Claude response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to parse AI response', raw: responseText.slice(0, 200) }, { status: 500 })
    }

    let extracted
    try {
      extracted = JSON.parse(jsonMatch[0])
    } catch {
      return NextResponse.json({ error: 'AI 回傳的 JSON 格式無效', raw: responseText.slice(0, 200) }, { status: 500 })
    }

    // Sanitize output to prevent XSS in downstream rendering
    const sanitized = deepSanitize(extracted)

    return NextResponse.json({
      success: true,
      data: sanitized,
      video_title: String(title).slice(0, 500),
      channel: String(channelTitle).slice(0, 200),
      view_count: Number(viewCount) || 0,
    })
  } catch (err) {
    console.error('Extraction error:', err)
    return NextResponse.json({ error: '萃取失敗，請稍後再試' }, { status: 500 })
  }
}

/** Strip HTML tags and dangerous patterns from all string values recursively */
function deepSanitize(obj: unknown): unknown {
  if (typeof obj === 'string') {
    return obj
      .replace(/<[^>]*>/g, '')                          // strip all HTML tags
      .replace(/javascript\s*:/gi, '')                   // strip javascript: URIs
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')     // strip inline event handlers
      .replace(/on\w+\s*=\s*[^\s>]*/gi, '')             // strip unquoted event handlers
  }
  if (Array.isArray(obj)) return obj.map(deepSanitize)
  if (obj && typeof obj === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(obj)) out[k] = deepSanitize(v)
    return out
  }
  return obj
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}
