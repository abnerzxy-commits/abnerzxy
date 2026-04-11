'use client'
import { useState } from 'react'
import { ReservationLink } from '@/lib/types'

const platformColors: Record<string, string> = {
  'Catch Table': 'bg-rose-600 hover:bg-rose-700 text-white',
  'KKday':       'bg-orange-500 hover:bg-orange-600 text-white',
  'Klook':       'bg-green-600 hover:bg-green-700 text-white',
  'Official':    'bg-blue-600 hover:bg-blue-700 text-white',
  'AutoReserve': 'bg-purple-600 hover:bg-purple-700 text-white',
  'Naver':       'bg-emerald-600 hover:bg-emerald-700 text-white',
  'Tabling':     'bg-sky-600 hover:bg-sky-700 text-white',
  'Email':       'bg-gray-600 hover:bg-gray-700 text-white',
}

const platformIcons: Record<string, string> = {
  'Catch Table': '🪑',
  'KKday':       '🎫',
  'Klook':       '🎟',
  'Official':    '🌐',
  'AutoReserve': '📋',
  'Naver':       '🗺',
  'Tabling':     '📲',
  'Email':       '✉️',
}

interface Props {
  links: ReservationLink[]
  reservationRequired?: boolean
}

export default function ReservationSection({ links, reservationRequired }: Props) {
  const [selectedDate, setSelectedDate] = useState('')

  // Today's date in YYYY-MM-DD for min
  const today = new Date().toISOString().split('T')[0]

  function buildUrl(link: ReservationLink): string {
    if (!selectedDate) return link.url
    // Append date param for platforms that support it
    const base = link.url
    if (link.platform === 'Catch Table') {
      return `${base}&date=${selectedDate}`
    }
    if (link.platform === 'Naver') {
      return `${base}&date=${selectedDate}`
    }
    return base
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
        🪑 訂位 / 購票
      </h2>

      {reservationRequired && (
        <div className="mb-4 flex items-center gap-2 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-2 text-red-700">
          <span className="text-base">⚠️</span>
          此餐廳人氣很高，<strong>強烈建議提前訂位</strong>
        </div>
      )}

      {/* Date picker */}
      <div className="mb-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <label htmlFor="reservation-date" className="block text-sm font-semibold text-blue-800 mb-2">
          📅 選擇用餐 / 遊覽日期（可選）
        </label>
        <input
          id="reservation-date"
          type="date"
          min={today}
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="w-full sm:w-auto border border-blue-200 rounded-xl px-4 py-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm transition-shadow hover:shadow-sm"
          aria-describedby={selectedDate ? 'date-hint' : undefined}
        />
        {selectedDate && (
          <p id="date-hint" className="mt-2 text-xs text-blue-600">
            點擊下方連結將自動帶入 {selectedDate.replace(/-/g, '/')} 的可用時段
          </p>
        )}
      </div>

      {/* Booking buttons */}
      <div className="flex flex-col gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={buildUrl(link)}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02] shadow-sm ${platformColors[link.platform] ?? 'bg-gray-700 hover:bg-gray-800 text-white'}`}
          >
            <span className="text-xl shrink-0">{platformIcons[link.platform] ?? '🔗'}</span>
            <div className="flex-1">
              <div>{link.label}</div>
              {link.note && (
                <div className="text-xs opacity-80 font-normal mt-0.5">{link.note}</div>
              )}
            </div>
            <svg className="w-4 h-4 opacity-70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>

      {/* Catch Table hint */}
      {links.some(l => l.platform === 'Tabling') && (
        <div className="mt-3 text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2">
          💡 Tabling 是韓國熱門候位 App，可遠端加入等位名單，到附近再去取號，省去現場枯等時間。
        </div>
      )}
      {links.some(l => l.platform === 'Catch Table') && (
        <div className="mt-3 text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2">
          💡 使用 <strong>Catch Table Global App</strong>（App Store 搜尋「CATCH TABLE」，選 GLOBAL 版本）。點擊按鈕會直接開啟 App，在 App 內搜尋餐廳名稱即可訂位。
        </div>
      )}
    </section>
  )
}
