import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/extract
 * Body: { youtube_url: string }
 *
 * Uses YouTube Data API + Claude AI to extract structured spot data
 * from a YouTube travel video about Korea.
 */
export async function POST(req: NextRequest) {
  const { youtube_url } = await req.json()

  if (!youtube_url) {
    return NextResponse.json({ error: 'youtube_url required' }, { status: 400 })
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

    // 4. Send to Claude for extraction
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
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
      return NextResponse.json({ error: 'Failed to parse AI response', raw: responseText }, { status: 500 })
    }

    const extracted = JSON.parse(jsonMatch[0])
    return NextResponse.json({
      success: true,
      data: extracted,
      video_title: title,
      channel: channelTitle,
      view_count: viewCount,
    })
  } catch (err) {
    console.error('Extraction error:', err)
    return NextResponse.json({ error: 'Extraction failed', details: String(err) }, { status: 500 })
  }
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
