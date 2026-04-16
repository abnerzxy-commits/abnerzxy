import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { suggestedItineraries, spots } from '@/lib/data'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import {
  estimateItineraryCost,
  getItineraryTransportModes,
  getTransportLabel,
  formatKRW,
} from '@/lib/utils'

export const metadata: Metadata = {
  title: '行程模板 | 帶娃衝釜山',
  description: '精心規劃的釜山親子行程模板，含時間安排、票價、交通建議與預估花費，直接套用出發。',
}

export default function ItineraryListPage() {
  return (
    <div>
      <BreadcrumbSchema items={[{ name: '行程規劃', href: '/itinerary' }]} />

      {/* Hero header — 統一與 /spots 的視覺風格 */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-4 right-8 text-7xl">🗓️</div>
          <div className="absolute bottom-2 left-12 text-5xl">✈️</div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
          <h1 className="text-2xl md:text-3xl font-bold">釜山親子行程模板</h1>
          <p className="text-blue-100 mt-1.5 text-sm md:text-base max-w-2xl">
            精心規劃 <span className="text-white font-semibold">{suggestedItineraries.length}</span> 條親子行程，含時間安排、交通建議與 <span className="text-white font-semibold">預估花費</span>，直接套用出發。
          </p>
          <p className="text-blue-200/80 mt-2 text-xs">
            ※ 費用依 2 大人 + 1 小孩估算，僅供預算參考
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40L60 35C120 30 240 20 360 16.7C480 13.3 600 16.7 720 20C840 23.3 960 26.7 1080 25C1200 23.3 1320 16.7 1380 13.3L1440 10V40H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {suggestedItineraries.map(itin => {
            const itinSpots = itin.spotIds.map(id => spots.find(s => s.id === id)).filter(Boolean)
            const cities = [...new Set(itinSpots.map(s => s?.city).filter(Boolean))]
            const totalItems = itin.schedule.reduce((acc, day) => acc + day.items.length, 0)
            const cost = estimateItineraryCost(itin, spots)
            const transportModes = getItineraryTransportModes(itin).slice(0, 3)
            const perPersonAvg = Math.round(cost.total / (cost.adults + cost.children))

            return (
              <Link key={itin.id} href={`/itinerary/${itin.id}`} className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">
                  <div className="relative h-56">
                    <Image src={itin.image_url} alt={itin.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {itin.days} 天行程
                      </span>
                      {transportModes.length > 0 && (
                        <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                          {transportModes.map(m => (
                            <span key={m} title={getTransportLabel(m).label}>{getTransportLabel(m).icon}</span>
                          ))}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl font-bold text-white mb-1 drop-shadow">{itin.title}</h2>
                      <p className="text-white/80 text-sm line-clamp-2">{itin.description}</p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
                      <span>📍 {cities.join('・')}</span>
                      <span>🗺 {totalItems} 個地點</span>
                    </div>

                    {/* Cost preview - 新增 */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/70 rounded-2xl p-4 mb-4 border border-blue-100/60">
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <span className="text-xs font-medium text-gray-500">預估全家花費</span>
                        <span className="text-[10px] text-gray-400">2 大 + 1 小</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-blue-700">{formatKRW(cost.total)}</span>
                        <span className="text-xs text-gray-500">/ 每人約 {formatKRW(perPersonAvg)}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">🎟 門票 {formatKRW(cost.tickets)}</span>
                        <span className="flex items-center gap-1">🍴 餐費 {formatKRW(cost.meals)}</span>
                        <span className="flex items-center gap-1">🚕 交通 {formatKRW(cost.transport)}</span>
                      </div>
                    </div>

                    {/* Day summary */}
                    <div className="space-y-2 flex-1">
                      {itin.schedule.map(day => (
                        <div key={day.day} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg shrink-0">
                            D{day.day}
                          </span>
                          <span className="text-sm text-gray-700 font-medium line-clamp-1">{day.title}</span>
                          <span className="text-xs text-gray-400 ml-auto shrink-0">{day.items.length} 點</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {itinSpots.slice(0, 4).map(s => s && (
                          <div key={s.id} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                            <Image src={s.image_url} alt={s.name_zh} fill className="object-cover" sizes="32px" />
                          </div>
                        ))}
                        {itinSpots.length > 4 && (
                          <div className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-500">
                            +{itinSpots.length - 4}
                          </div>
                        )}
                      </div>
                      <span className="text-blue-600 font-semibold text-sm group-hover:underline">
                        查看完整行程 →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Custom itinerary CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-center text-white">
          <div className="text-4xl mb-3">✏️</div>
          <h2 className="text-2xl font-bold mb-2">想要客製化行程？</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            前往景點頁面，選好你想去的地方，根據模板自行調整，打造專屬的釜山行程
          </p>
          <Link href="/spots" className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            瀏覽景點餐廳
          </Link>
        </div>
      </div>
    </div>
  )
}
