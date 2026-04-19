import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { spots, typeLabels, spiceLevelLabels } from '@/lib/data'
import { formatKRW, formatKRWtoTWD, getTypeColor, getTypeIcon, minutesToHoursText, haversineDistance, formatDistance, walkingTime, getOpenStatus, getCurrentDayKey } from '@/lib/utils'
import { Dish } from '@/lib/types'
import NaverMap from '@/components/NaverMap'
import ReservationSection from '@/components/ReservationSection'
import CopyablePhrase from '@/components/CopyablePhrase'
import ShareButtons from '@/components/ShareButtons'
import FavoriteButton from '@/components/FavoriteButton'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import SpotQuickActions from '@/components/SpotQuickActions'
import SpotSectionNav from '@/components/SpotSectionNav'
import { OpenStatusBadge, OpenStatusDayHighlight } from '@/components/OpenStatusBadge'

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
    openGraph: {
      title: `${spot.name_zh}（${spot.name_ko}）| 帶娃衝釜山`,
      description: spot.description,
      images: [spot.image_url],
      locale: 'zh_TW',
      type: 'article',
    },
  }
}

function generateJsonLd(spot: typeof spots[number]) {
  const BASE_URL = 'https://korea-travel.vercel.app'

  if (spot.type === 'restaurant' || spot.type === 'cafe' || spot.type === 'dessert') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: spot.name_zh,
      alternateName: spot.name_ko,
      description: spot.description,
      image: spot.image_url,
      url: `${BASE_URL}/spots/${spot.slug}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: spot.address_ko,
        addressLocality: spot.district,
        addressRegion: spot.city,
        addressCountry: 'KR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: spot.lat,
        longitude: spot.lng,
      },
      ...(spot.rating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: spot.rating,
          reviewCount: spot.review_count || 0,
          bestRating: 5,
        },
      }),
      ...(spot.avg_price_krw && {
        priceRange: spot.price_range === 'budget' ? '₩' : spot.price_range === 'moderate' ? '₩₩' : '₩₩₩',
      }),
      ...(spot.cuisine_type && { servesCuisine: spot.cuisine_type }),
      acceptsReservations: spot.reservation_required ? 'True' : 'False',
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: spot.name_zh,
    alternateName: spot.name_ko,
    description: spot.description,
    image: spot.image_url,
    url: `${BASE_URL}/spots/${spot.slug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: spot.address_ko,
      addressLocality: spot.district,
      addressRegion: spot.city,
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: spot.lat,
      longitude: spot.lng,
    },
    ...(spot.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: spot.rating,
        reviewCount: spot.review_count || 0,
        bestRating: 5,
      },
    }),
    ...(spot.ticket_price_free && { isAccessibleForFree: true }),
  }
}

function KidScoreBadge({ score, notes }: { score: number; notes?: string }) {
  const labels = ['', '不太適合', '需留意', '尚可', '適合', '非常適合！']
  const colors = ['', 'bg-red-100 text-red-700', 'bg-orange-100 text-orange-700', 'bg-yellow-100 text-yellow-700', 'bg-green-100 text-green-700', 'bg-emerald-100 text-emerald-700']
  return (
    <div className={`rounded-2xl px-5 py-4 ${colors[score]}`} role="status" aria-label={`親子友善度 ${score} 星：${labels[score]}`}>
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="font-bold text-sm">👶 2-6歲親子友善度：{labels[score]}</span>
        <div className="flex" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-sm ${i < score ? '' : 'opacity-20'}`}>⭐</span>
          ))}
        </div>
      </div>
      {notes && <p className="text-xs leading-relaxed mt-1">{notes}</p>}
    </div>
  )
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className={`bg-white rounded-2xl border p-4 flex gap-4 hover:shadow-sm transition-shadow ${dish.must_order ? 'border-orange-200 bg-orange-50/30 ring-1 ring-orange-100' : 'border-gray-100'}`}>
      {dish.image_url && (
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
          <Image src={dish.image_url} alt={`${dish.name_zh}的照片`} fill className="object-cover" sizes="80px" loading="lazy" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-900">{dish.name_zh}</span>
          {dish.must_order && <span className="text-xs bg-orange-500 text-white px-2.5 py-0.5 rounded-full font-medium shadow-sm">必點</span>}
        </div>
        <p className="text-xs text-gray-500 mt-0.5" lang="ko">{dish.name_ko}</p>
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

  const nearbySpots = spots
    .filter(s => s.id !== spot.id)
    .map(s => ({ spot: s, dist: haversineDistance(spot.lat, spot.lng, s.lat, s.lng) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 6)

  const priceDisplay = spot.ticket_price_free
    ? '免費'
    : spot.ticket_price_krw
    ? `${formatKRW(spot.ticket_price_krw)} / 人（${formatKRWtoTWD(spot.ticket_price_krw)}）`
    : spot.avg_price_krw
    ? `約 ${formatKRW(spot.avg_price_krw)} / 人（${formatKRWtoTWD(spot.avg_price_krw)}）`
    : null

  const jsonLd = generateJsonLd(spot)

  // Build dynamic section nav based on available content
  const sectionNavItems = [
    { id: 'spot-overview', label: '總覽', icon: '📋' },
    ...(spot.review_summary ? [{ id: 'spot-reviews', label: '評價', icon: '📝' }] : []),
    ...(spot.reservation_links?.length ? [{ id: 'spot-reservation', label: '訂位', icon: '🪑' }] : []),
    ...(spot.recommended_dishes?.length ? [{ id: 'spot-dishes', label: '菜單', icon: '🍽' }] : []),
    ...(spot.staff_phrases?.length ? [{ id: 'spot-phrases', label: '韓文', icon: '👆' }] : []),
    { id: 'spot-map', label: '地圖', icon: '🗺' },
    { id: 'spot-nearby', label: '附近', icon: '📍' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32 md:pb-8">
      <SpotSectionNav sections={sectionNavItems} />
      <BreadcrumbSchema items={[
        { name: '景點餐廳', href: '/spots' },
        { name: spot.name_zh, href: `/spots/${spot.slug}` },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026') }}
      />
      <Link href="/spots" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        ← 返回景點列表
      </Link>

      {/* Hero Image */}
      <div data-spot-hero className="relative h-72 md:h-96 rounded-3xl overflow-hidden bg-gray-200 mb-8">
        <Image src={spot.image_url} alt={spot.name_zh} fill className="object-cover" priority fetchPriority="high" sizes="(max-width: 1024px) 100vw, 896px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Favorite button overlay */}
        <div className="absolute top-4 right-4">
          <FavoriteButton spotId={spot.id} size="md" />
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between">
            <div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(spot.type)}`}>
                {getTypeIcon(spot.type)} {typeLabels[spot.type]}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 drop-shadow">{spot.name_zh}</h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-white/80 text-lg">{spot.name_ko}</p>
                <OpenStatusBadge openingHours={spot.opening_hours} />
              </div>
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

      {/* Mobile Quick Info Strip — key info visible immediately on mobile */}
      <div className="lg:hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="space-y-3">
          {priceDisplay && (
            <div className="flex items-center gap-3">
              <span className="text-lg shrink-0">💰</span>
              <div>
                <p className="text-xs text-gray-400">票價 / 消費</p>
                <p className="text-sm font-semibold text-green-700">{priceDisplay}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="text-lg shrink-0">📍</span>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">地址</p>
              <p className="text-sm font-semibold text-gray-900">{spot.address_zh}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{spot.address_ko}</p>
            </div>
          </div>
          {spot.opening_hours && (
            <div className="flex items-center gap-3">
              <span className="text-lg shrink-0">🕐</span>
              <div>
                <OpenStatusBadge openingHours={spot.opening_hours} />
                {spot.opening_hours.note && (
                  <p className="text-sm text-orange-600 font-medium mt-1">{spot.opening_hours.note}</p>
                )}
              </div>
            </div>
          )}
          {spot.time_needed_minutes ? (
            <div className="flex items-center gap-3">
              <span className="text-lg shrink-0">⏱</span>
              <div>
                <p className="text-xs text-gray-400">建議停留</p>
                <p className="text-sm font-semibold">{minutesToHoursText(spot.time_needed_minutes)}</p>
              </div>
            </div>
          ) : null}
          {(spot.has_english_menu || spot.accepts_card || spot.reservation_required !== undefined) && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
              {spot.has_english_menu && <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full font-medium">英文菜單</span>}
              {spot.accepts_card && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full font-medium">可刷卡</span>}
              {spot.reservation_required === false && <span className="text-xs bg-gray-50 text-gray-600 border border-gray-100 px-2.5 py-1 rounded-full font-medium">不需訂位</span>}
              {spot.reservation_required && <span className="text-xs bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 rounded-full font-medium">建議訂位</span>}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Description */}
          <div id="spot-overview">
            <p className="text-gray-700 leading-relaxed text-lg">{spot.description}</p>
          </div>

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
            <section id="spot-reviews" aria-labelledby="review-heading">
              <h2 id="review-heading" className="text-xl font-bold text-gray-900 mb-4">📝 網友評價總結</h2>
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
            <div id="spot-reservation">
            <ReservationSection
              links={spot.reservation_links}
              reservationRequired={spot.reservation_required}
            />
            </div>
          )}

          {/* Recommended Dishes */}
          {spot.recommended_dishes && spot.recommended_dishes.length > 0 && (
            <section id="spot-dishes" aria-labelledby="dishes-heading">
              <h2 id="dishes-heading" className="text-xl font-bold text-gray-900 mb-4">🍽 推薦必點菜單</h2>
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

          {/* Staff Phrases */}
          {spot.staff_phrases && spot.staff_phrases.length > 0 && (
            <section id="spot-phrases" aria-labelledby="staff-phrases-heading">
              <h2 id="staff-phrases-heading" className="text-xl font-bold text-gray-900 mb-2">👆 指給店員看</h2>
              <p className="text-sm text-gray-400 mb-4">點選句子可複製，或直接拿手機給店員看</p>
              <div className="space-y-3">
                {spot.staff_phrases.map((phrase, i) => (
                  <CopyablePhrase key={i} situation={phrase.situation} korean={phrase.korean} />
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">🕐 營業時間</h3>
                <OpenStatusBadge openingHours={spot.opening_hours} />
              </div>
              {spot.opening_hours.note && (
                <p className="text-sm text-orange-600 bg-orange-50 rounded-xl p-3 mb-3">{spot.opening_hours.note}</p>
              )}
              <OpenStatusDayHighlight openingHours={spot.opening_hours} />
            </div>
          )}

          {/* Naver Map */}
          <div id="spot-map" data-section="map">
            <h3 className="font-bold text-gray-900 mb-3">🗺 地圖 / 導航</h3>
            <NaverMap lat={spot.lat} lng={spot.lng} name={spot.name_ko} address={spot.address_ko} />
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

          {/* Share Buttons */}
          <ShareButtons
            title={`${spot.name_zh}（${spot.name_ko}）| 帶娃衝釜山`}
            description={spot.description}
            url={`https://korea-travel.vercel.app/spots/${spot.slug}`}
          />
        </div>
      </div>

      {/* Mobile Quick Actions Bar */}
      <SpotQuickActions
        nameKo={spot.name_ko}
        lat={spot.lat}
        lng={spot.lng}
        hasReservation={!!spot.reservation_links?.length}
        firstReservationUrl={spot.reservation_links?.[0]?.url}
      />

      {/* Nearby Spots */}
      {nearbySpots.length > 0 && (
        <section id="spot-nearby" className="mt-14">
          <h2 className="text-xl font-bold text-gray-900 mb-2">附近景點推薦</h2>
          <p className="text-sm text-gray-400 mb-6">依照實際距離排序，方便安排同日行程</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbySpots.map(({ spot: s, dist }) => (
              <Link key={s.id} href={`/spots/${s.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="relative h-36">
                  <Image src={s.image_url} alt={s.name_zh} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="350px" />
                  <div className="absolute top-2 left-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor(s.type)}`}>
                      {getTypeIcon(s.type)} {typeLabels[s.type]}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium text-blue-700 shadow-sm">
                    {formatDistance(dist)}
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">{s.name_zh}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{s.district}</span>
                    {dist < 2 && (
                      <span className="text-xs text-green-600 font-medium">{walkingTime(dist)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
