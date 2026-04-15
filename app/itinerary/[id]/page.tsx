import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { suggestedItineraries, spots, typeLabels } from '@/lib/data'
import { formatKRW, getTypeColor, getTypeIcon, minutesToHoursText } from '@/lib/utils'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

export function generateStaticParams() {
  return suggestedItineraries.map(i => ({ id: i.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const itin = suggestedItineraries.find(i => i.id === id)
  if (!itin) return {}
  return { title: `${itin.title} | 帶娃衝釜山行程`, description: itin.description }
}

const transportLabel: Record<string, string> = {
  walk: '🚶 步行',
  chartered: '🚐 包車',
  uber: '🚕 Uber',
  capsule: '🚃 膠囊列車',
  subway: '🚇 地鐵',
  taxi: '🚕 計程車',
  bus: '🚌 公車',
}

export default async function ItineraryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const itin = suggestedItineraries.find(i => i.id === id)
  if (!itin) notFound()

  const allSpots = itin.spotIds.map(sid => spots.find(s => s.id === sid)).filter((s): s is (typeof spots)[number] => s != null)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BreadcrumbSchema items={[
        { name: '行程規劃', href: '/itinerary' },
        { name: itin.title, href: `/itinerary/${itin.id}` },
      ]} />
      <Link href="/itinerary" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        ← 返回行程列表
      </Link>

      {/* Header */}
      <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden mb-8">
        <Image src={itin.image_url} alt={itin.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 896px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1.5 rounded-full">{itin.days} 天行程</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">{itin.title}</h1>
          <p className="text-white/80 mt-1">{itin.description}</p>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: '行程天數', value: `${itin.days} 天` },
          { label: '景點數量', value: `${itin.spotIds.length} 個` },
          { label: '涵蓋城市', value: [...new Set(allSpots.map(s => s?.city))].join('・') },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-xl font-bold text-blue-600">{item.value}</div>
            <div className="text-xs text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Day-by-day Schedule */}
      <div className="space-y-10">
        {itin.schedule.map(day => (
          <section key={day.day}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shrink-0">
                D{day.day}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{day.title}</h2>
                <p className="text-sm text-gray-400">{day.items.length} 個活動</p>
              </div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-100" />

              <div className="space-y-4">
                {day.items.map((item, idx) => {
                  const spot = item.spotId ? spots.find(s => s.id === item.spotId) : null
                  const isLast = idx === day.items.length - 1

                  return (
                    <div key={idx}>
                      <div className="flex gap-4">
                        {/* Timeline dot */}
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 bg-white border-2 border-blue-400 rounded-full flex items-center justify-center text-base z-10 relative shadow-sm">
                            {spot ? getTypeIcon(spot.type) : '📌'}
                          </div>
                        </div>

                        {/* Card */}
                        {spot ? (
                          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="flex">
                              <div className="relative w-28 md:w-36 shrink-0">
                                <Image src={spot.image_url} alt={spot.name_zh} fill className="object-cover" sizes="144px" />
                              </div>
                              <div className="p-4 flex-1">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{item.start}</span>
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(spot.type)}`}>
                                        {typeLabels[spot.type]}
                                      </span>
                                    </div>
                                    <Link href={`/spots/${spot.slug}`} className="font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                      {spot.name_zh}
                                    </Link>
                                    <p className="text-xs text-gray-400">{spot.name_ko}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{spot.description}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-3">
                                  <span className="text-xs text-gray-400">⏱ 約 {minutesToHoursText(item.duration)}</span>
                                  {spot.ticket_price_free ? (
                                    <span className="text-xs text-green-600 font-medium">免費</span>
                                  ) : spot.ticket_price_krw ? (
                                    <span className="text-xs text-green-600 font-medium">{formatKRW(spot.ticket_price_krw)}</span>
                                  ) : spot.avg_price_krw ? (
                                    <span className="text-xs text-green-600 font-medium">約 {formatKRW(spot.avg_price_krw)}/人</span>
                                  ) : null}
                                </div>
                                {item.note && (
                                  <div className="mt-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                                    💡 {item.note}
                                  </div>
                                )}
                              </div>
                            </div>
                            {spot.recommended_dishes && spot.recommended_dishes.length > 0 && (
                              <div className="border-t border-gray-50 px-4 py-3 bg-orange-50/50 flex gap-2 flex-wrap">
                                {spot.recommended_dishes.filter(d => d.must_order).map(dish => (
                                  <span key={dish.name_zh} className="text-xs bg-orange-100 text-orange-700 rounded-full px-2 py-1">
                                    必點：{dish.name_zh} {formatKRW(dish.price_krw)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex-1 bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{item.start}</span>
                                <span className="text-xs text-gray-400">⏱ 約 {minutesToHoursText(item.duration)}</span>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">{item.note}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Transport arrow between items */}
                      {!isLast && (() => {
                        const nextItem = day.items[idx + 1]
                        const travel = nextItem?.travelFromPrev
                        if (!travel) return null
                        return (
                          <div className="flex gap-4 my-2">
                            <div className="w-10 shrink-0 flex justify-center">
                              <div className="w-0.5 h-8 bg-gray-100" />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400 pl-2">
                              <span>↓</span>
                              <span className="bg-gray-100 px-2 py-1 rounded-full">
                                {transportLabel[travel.mode] || travel.mode} 約 {travel.minutes} 分鐘
                                {travel.note && `（${travel.note}）`}
                              </span>
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* All spots in this itinerary */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-gray-900 mb-6">行程中的所有地點</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allSpots.map(s => (
            <Link key={s.id} href={`/spots/${s.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all">
              <div className="relative h-24">
                <Image src={s.image_url} alt={s.name_zh} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="250px" />
              </div>
              <div className="p-3">
                <p className="font-semibold text-xs text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{s.name_zh}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.district}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/spots" className="text-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors">
          🗺 瀏覽更多景點
        </Link>
        <Link href="/itinerary" className="text-center bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl border border-gray-200 transition-colors">
          查看其他行程 →
        </Link>
      </div>
    </div>
  )
}
