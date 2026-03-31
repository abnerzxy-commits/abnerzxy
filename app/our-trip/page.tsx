import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '我們的行程 | 釜山六天五夜櫻花與海之旅',
  description: '2026/4/8-4/13 釜山六天五夜親子行程一覽',
}

const days = [
  {
    day: 1,
    date: '4/8',
    weekday: '三',
    items: [
      { icon: '✈️', text: '抵達\n金海機場' },
      { icon: '🚗', text: '機場接送' },
      { icon: '🏠', text: 'Airbnb', sub: 'Check in' },
      { icon: '🍖', text: '豚湯\nor 燒肉', sub: '晚餐' },
      { icon: '🌊', text: '海邊散步', sub: '⚠️ 不要撐！' },
    ],
  },
  {
    day: 2,
    date: '4/9',
    weekday: '四',
    items: [
      { icon: '🚕', text: '出發' },
      { icon: '🛷', text: 'Skyline\nLuge', sub: '超好玩！' },
      { icon: '🍜', text: '午餐', sub: '海雲台' },
      { icon: '🦈', text: '釜山\n水族館' },
      { icon: '🏖️', text: '海灘放風', sub: '🪁 玩沙' },
      { icon: '🥩', text: '味贊王\n烤肉', sub: 'or 海雲台晚餐' },
    ],
  },
  {
    day: 3,
    date: '4/10',
    weekday: '五',
    items: [
      { icon: '🍔', text: '早餐', sub: '麥當勞' },
      { icon: '🚕', text: '前往尾浦' },
      { icon: '🚂', text: '海岸列車', sub: '🔥 風景最好' },
      { icon: '🏖️', text: '抵達松亭' },
      { icon: '⛩️', text: '海東\n龍宮寺', sub: '注意樓梯' },
      { icon: '🍱', text: '午餐', sub: 'or 樂天 Outlet' },
    ],
  },
  {
    day: 4,
    date: '4/11',
    weekday: '六',
    items: [
      { icon: '🧳', text: '前往南浦', sub: '放行李' },
      { icon: '🎨', text: '甘川\n文化村', sub: '手翻書體驗' },
      { icon: '🥞', text: '午餐' },
      { icon: '🚡', text: '松島\n海上纜車' },
      { icon: '🛒', text: '南浦洞\n＆BIFF', sub: '小吃＋逛街' },
      { icon: '🍗', text: '晚餐', sub: '明星一隻雞' },
    ],
  },
  {
    day: 5,
    date: '4/12',
    weekday: '日',
    items: [
      { icon: '👟', text: '逛街' },
      { icon: '🌸', text: '賞櫻行程', sub: '三樂 or\n大渚公園' },
      { icon: '🏬', text: '西面\nLotte百貨' },
    ],
  },
  {
    day: 6,
    date: '4/13',
    weekday: '一',
    items: [
      { icon: '🥪', text: '早餐', sub: 'Egg Drop' },
      { icon: '🎁', text: '最後採買' },
      { icon: '🚕', text: '到機場' },
      { icon: '✈️', text: '釜山 →\n台中', sub: '回程非常順利 🎉' },
    ],
  },
]

const dayStyles = [
  { ring: '#FF6B98', bg: '#FFF0F4', soft: '#FFDCE8' },
  { ring: '#FF85A1', bg: '#FFF2F4', soft: '#FFE0E8' },
  { ring: '#E87FB5', bg: '#FDF0F6', soft: '#F8D8EA' },
  { ring: '#FF6B98', bg: '#FFF0F4', soft: '#FFDCE8' },
  { ring: '#FF85A1', bg: '#FFF2F4', soft: '#FFE0E8' },
  { ring: '#E87FB5', bg: '#FDF0F6', soft: '#F8D8EA' },
]

export default function OurTripPage() {
  return (
    <div className="min-h-screen bg-[#FFF5F8] py-6 px-3">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-[2rem] shadow-2xl overflow-hidden"
          style={{
            border: '4px solid #FFB6C8',
            background: 'linear-gradient(180deg, #FFF8FA 0%, #FFFFFF 15%, #FFFFFF 85%, #FFF8FA 100%)',
          }}
        >
          {/* ── Title ── */}
          <div
            className="relative py-8 px-6 text-center"
            style={{
              background: 'linear-gradient(135deg, #FFB6C8 0%, #FF85A1 30%, #FF6B98 60%, #FF85A1 100%)',
            }}
          >
            {/* Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <span className="absolute top-3 left-5 text-3xl opacity-40 -rotate-12">🎀</span>
              <span className="absolute top-3 right-5 text-3xl opacity-40 rotate-12">🎀</span>
              <span className="absolute bottom-3 left-[15%] text-2xl opacity-25">🌸</span>
              <span className="absolute bottom-3 right-[15%] text-2xl opacity-25">🌸</span>
              <span className="absolute top-1/2 left-[8%] text-lg opacity-20 -translate-y-1/2">♡</span>
              <span className="absolute top-1/2 right-[8%] text-lg opacity-20 -translate-y-1/2">♡</span>
              {/* Polka dots */}
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="relative">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md tracking-wide">
                釜山六天五夜
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-white/95 mt-1 tracking-wider drop-shadow-sm">
                🌸 櫻花與海之旅 🌊
              </h2>
              <div className="inline-flex items-center gap-1.5 bg-white/25 backdrop-blur-sm rounded-full px-5 py-1.5 mt-3 border border-white/30">
                <span className="text-white text-sm font-bold tracking-widest">2026 / 4 / 8 — 4 / 13</span>
              </div>
            </div>
          </div>

          {/* ── Rows ── */}
          <div className="px-4 md:px-6 py-5 space-y-3">
            {days.map((day, idx) => {
              const s = dayStyles[idx]
              return (
                <div
                  key={day.day}
                  className="rounded-2xl px-3 py-3 md:px-4 md:py-3.5"
                  style={{ background: s.bg, border: `2px solid ${s.soft}` }}
                >
                  <div className="flex items-center gap-3">
                    {/* Day badge */}
                    <div
                      className="shrink-0 rounded-2xl w-[60px] md:w-[68px] py-2.5 text-center shadow-md"
                      style={{ background: s.ring, boxShadow: `0 3px 12px ${s.ring}40` }}
                    >
                      <div className="text-[9px] font-bold text-white/80 tracking-widest uppercase">Day</div>
                      <div className="text-3xl font-extrabold text-white leading-none">{day.day}</div>
                      <div className="text-[10px] font-bold text-white/90 mt-0.5">{day.date}<span className="text-white/60">({day.weekday})</span></div>
                    </div>

                    {/* Items */}
                    <div className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-hide py-1">
                      {day.items.map((item, i) => (
                        <div key={i} className="contents">
                          {i > 0 && (
                            <svg className="shrink-0 w-5 h-5 text-pink-300" viewBox="0 0 20 20" fill="none">
                              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          <div
                            className="shrink-0 rounded-xl px-2 py-2 text-center min-w-[68px] max-w-[100px] border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                            style={{ background: 'rgba(255,255,255,0.85)' }}
                          >
                            <div className="text-[22px] leading-none">{item.icon}</div>
                            <div className="text-[11px] font-bold text-pink-800 leading-tight mt-1 whitespace-pre-line">{item.text}</div>
                            {item.sub && (
                              <div className="text-[9px] text-pink-400 leading-tight mt-0.5 whitespace-pre-line font-medium">{item.sub}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Footer ── */}
          <div
            className="text-center py-5"
            style={{ background: 'linear-gradient(180deg, transparent, #FFF0F4)' }}
          >
            <div className="text-2xl tracking-[0.3em] mb-1">🎀 🌸 ✈️ 🌸 🎀</div>
            <p className="text-pink-400 text-xs font-bold tracking-[0.2em]">期待我們的釜山之旅 ♡</p>
          </div>
        </div>
      </div>
    </div>
  )
}
