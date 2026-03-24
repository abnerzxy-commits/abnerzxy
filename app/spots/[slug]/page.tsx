import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { spots, typeLabels, spiceLevelLabels } from '@/lib/data'
import { formatKRW, formatKRWtoTWD, getTypeColor, getTypeIcon, minutesToHoursText } from '@/lib/utils'
import { Dish } from '@/lib/types'
import GoogleMap from '@/components/GoogleMap'
import ReservationSection from '@/components/ReservationSection'

export function generateStaticParams() {
  return spots.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const spot = spots.find(s => s.slug === slug)
  if (!spot) return {}
  return {
    title: `${spot.name_zh}（${spot.name_ko}）| 釜山親子旅遊`,
    description: spot.description,
  }
}

function KidScoreBadge({ score, notes }: { score: number; notes?: string }) {
  const labels = ['', '不太適合', '需留意', '尚可', '適合', '非常適合！']
  const colors = ['', 'bg-red-100 text-red-700', 'bg-orange-100 text-orange-700', 'bg-yellow-100 text-yellow-700', 'bg-green-100 text-green-700', 'bg-emerald-100 text-emerald-700']
  return (
    <div className={`rounded-2xl px-4 py-3 ${colors[score]}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-sm">👶 2-6歲親子友善度：{labels[score]}</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-sm ${i < score ? '' : 'opacity-20'}`}>⭐</span>
          ))}
        </div>
      </div>
      {notes && <p className="text-xs leading-relaxed">{notes}</p>}
    </div>
  )
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className={`bg-white rounded-2xl border p-4 flex gap-4 ${dish.must_order ? 'border-orange-200 bg-orange-50/30' : 'border-gray-100'}`}>
      {dish.image_url && (
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
          <Image src={dish.image_url} alt={dish.name_zh} fill className="object-cover" sizes="80px" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-900">{dish.name_zh}</span>
          {dish.must_order && <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">必點</span>}
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{dish.name_ko}</p>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{dish.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm font-bold text-green-700">{formatKRW(dish.price_krw)}</span>
          <span className="text-xs text-gray-400">{formatKRWtoTWD(dish.price_krw)}</span>
        </div>
      </div>
    </div>
  )
}

export default async function SpotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const spot = spots.find(s => s.slug === slug)
  if (!spot) notFound()

  const relatedSpots = spots
    .filter(s => s.id !== spot.id && (s.district === spot.district || s.type === spot.type))
    .slice(0, 3)

  const priceDisplay = spot.ticket_price_free
    ? '免費'
    : spot.ticket_price_krw
    ? `${formatKRW(spot.ticket_price_krw)} / 人（${formatKRWtoTWD(spot.ticket_price_krw)}）`
    : spot.avg_price_krw
    ? `約 ${formatKRW(spot.avg_price_krw)} / 人（${formatKRWtoTWD(spot.avg_price_krw)}）`
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/spots" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        ← 返回景點列表
      </Link>

      {/* Hero Image */}
      <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden bg-gray-200 mb-8">
        <Image src={spot.image_url} alt={spot.name_zh} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 896px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between">
            <div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(spot.type)}`}>
                {getTypeIcon(spot.type)} {typeLabels[spot.type]}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 drop-shadow">{spot.name_zh}</h1>
              <p className="text-white/80 text-lg">{spot.name_ko}</p>
            </div>
            {spot.rating && (
              <div className="bg-white/90 backdrop-blur rounded-2xl px-4 py-2 text-center">
                <div className="text-2xl font-bold text-gray-900">⭐ {spot.rating}</div>
                <div className="text-xs text-gray-500">{spot.review_count?.toLocaleString()} 則評價</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-lg">{spot.description}</p>

          {/* Kid-friendly badge */}
          <KidScoreBadge score={spot.kid_friendly_score} notes={spot.kid_friendly_notes} />

          {/* Spice level */}
          {spot.spice_level && (
            <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${
              spot.spice_level === 'none' ? 'bg-green-50 border border-green-100 text-green-800' :
              spot.spice_level === 'mild' ? 'bg-yellow-50 border border-yellow-100 text-yellow-800' :
              'bg-red-50 border border-red-100 text-red-800'
            }`}>
              <span className="text-xl">🌶</span>
              <span>辣度：{spiceLevelLabels[spot.spice_level]}</span>
            </div>
          )}

          {/* Pros & Cons */}
          {spot.review_summary && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">📝 網友評價總結</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                  <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <span className="text-lg">👍</span> 大家說好
                  </h3>
                  <ul className="space-y-2">
                    {spot.review_summary.pros.map((pro, i) => (
                      <li key={i} className="flex gap-2 text-sm text-green-900">
                        <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
                  <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <span className="text-lg">⚠️</span> 需要注意
                  </h3>
                  <ul className="space-y-2">
                    {spot.review_summary.cons.map((con, i) => (
                      <li key={i} className="flex gap-2 text-sm text-orange-900">
                        <span className="text-orange-500 shrink-0 mt-0.5">▸</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Reservation (only if has links) */}
          {spot.reservation_links && spot.reservation_links.length > 0 && (
            <ReservationSection
              links={spot.reservation_links}
              reservationRequired={spot.reservation_required}
              name={spot.name_ko}
            />
          )}

          {/* Recommended Dishes */}
          {spot.recommended_dishes && spot.recommended_dishes.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">🍽 推薦必點菜單</h2>
              <div className="space-y-3">
                {spot.recommended_dishes.map((dish, i) => <DishCard key={i} dish={dish} />)}
              </div>
            </section>
          )}

          {/* Ordering Tips */}
          {spot.ordering_tips && spot.ordering_tips.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">💬 點餐攻略</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
                {spot.ordering_tips.map((tip, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-amber-500 shrink-0 mt-0.5">▸</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tips */}
          {spot.tips && spot.tips.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">💡 旅遊小技巧</h2>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-3">
                {spot.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-blue-500 shrink-0 mt-0.5">▸</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Info Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="font-bold text-gray-900">基本資訊</h3>

            {priceDisplay && (
              <div className="flex gap-3">
                <span className="text-xl shrink-0">💰</span>
                <div>
                  <p className="text-xs text-gray-400">票價 / 消費</p>
                  <p className="text-sm font-semibold text-green-700">{priceDisplay}</p>
                </div>
              </div>
            )}

            {spot.time_needed_minutes ? (
              <div className="flex gap-3">
                <span className="text-xl shrink-0">⏱</span>
                <div>
                  <p className="text-xs text-gray-400">建議停留</p>
                  <p className="text-sm font-semibold">{minutesToHoursText(spot.time_needed_minutes)}</p>
                </div>
              </div>
            ) : null}

            {spot.best_time_to_visit && (
              <div className="flex gap-3">
                <span className="text-xl shrink-0">🌟</span>
                <div>
                  <p className="text-xs text-gray-400">最佳時段</p>
                  <p className="text-sm font-semibold">{spot.best_time_to_visit}</p>
                </div>
              </div>
            )}

            {spot.min_age !== undefined && (
              <div className="flex gap-3">
                <span className="text-xl shrink-0">👶</span>
                <div>
                  <p className="text-xs text-gray-400">建議最低年齡</p>
                  <p className="text-sm font-semibold">{spot.min_age === 0 ? '所有年齡適合' : `${spot.min_age} 歲以上`}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <span className="text-xl shrink-0">📍</span>
              <div>
                <p className="text-xs text-gray-400">地址</p>
                <p className="text-sm font-semibold">{spot.address_zh}</p>
                <p className="text-xs text-gray-400 mt-0.5">{spot.address_ko}</p>
              </div>
            </div>

            {/* Restaurant badges */}
            {spot.type === 'restaurant' && (
              <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                {spot.has_english_menu && <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-1 rounded-full">英文菜單</span>}
                {spot.accepts_card && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded-full">可刷卡</span>}
                {spot.reservation_required === false && <span className="text-xs bg-gray-50 text-gray-600 border border-gray-100 px-2 py-1 rounded-full">不需訂位</span>}
                {spot.reservation_required && <span className="text-xs bg-red-50 text-red-700 border border-red-100 px-2 py-1 rounded-full">建議訂位</span>}
              </div>
            )}
          </div>

          {/* Opening Hours */}
          {spot.opening_hours && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3">🕐 營業時間</h3>
              {spot.opening_hours.note && (
                <p className="text-sm text-orange-600 bg-orange-50 rounded-xl p-3 mb-3">{spot.opening_hours.note}</p>
              )}
              <div className="space-y-1 text-sm">
                {(['mon','tue','wed','thu','fri','sat','sun'] as const).map(day => {
                  const labels: Record<string, string> = { mon: '週一', tue: '週二', wed: '週三', thu: '週四', fri: '週五', sat: '週六', sun: '週日' }
                  const val = spot.opening_hours?.[day]
                  if (!val) return null
                  return (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-500">{labels[day]}</span>
                      <span className="text-gray-900 font-medium">{val}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Google Map */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">📍 地圖位置</h3>
            <GoogleMap lat={spot.lat} lng={spot.lng} name={spot.name_ko} address={spot.address_ko} />
          </div>

          {/* Tags */}
          {spot.tags && spot.tags.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex flex-wrap gap-2">
                {spot.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-50 text-gray-600 border border-gray-100 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Spots */}
      {relatedSpots.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-gray-900 mb-6">附近 / 同類型推薦</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedSpots.map(s => (
              <Link key={s.id} href={`/spots/${s.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="relative h-36">
                  <Image src={s.image_url} alt={s.name_zh} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="350px" />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">{s.name_zh}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.district}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
