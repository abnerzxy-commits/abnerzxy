'use client'
import { useState, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Spot } from '@/lib/types'
import { cn, formatKRW, getTypeColor, getTypeIcon, getOpenStatus } from '@/lib/utils'
import { typeLabels } from '@/lib/data'
import FavoriteButton from '@/components/FavoriteButton'

function KidScore({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1" title={`親子友善度 ${score}/5`} aria-label={`親子友善度 ${score} 星，滿分 5 星`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-xs ${i < score ? 'opacity-100' : 'opacity-20'}`} aria-hidden="true">👶</span>
      ))}
    </div>
  )
}

const SpotCard = memo(function SpotCard({ spot, distance }: { spot: Spot; distance?: number }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const openStatus = getOpenStatus(spot.opening_hours)
  const priceText = spot.ticket_price_free
    ? '免費'
    : spot.ticket_price_krw
    ? formatKRW(spot.ticket_price_krw)
    : spot.avg_price_krw
    ? `約 ${formatKRW(spot.avg_price_krw)}/人`
    : null

  return (
    <Link href={`/spots/${spot.slug}`} className="group block" aria-label={`${spot.name_zh} - ${spot.district} - ${typeLabels[spot.type]}`}>
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className={cn('relative h-44 overflow-hidden shrink-0 img-skeleton', imgLoaded && 'loaded')}>
          <Image
            src={spot.image_url}
            alt={`${spot.name_zh}的照片`}
            fill
            className={cn(
              'object-cover group-hover:scale-110 transition-all duration-700 ease-out',
              imgLoaded ? 'opacity-100' : 'opacity-0'
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className={cn('text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm', getTypeColor(spot.type))}>
              {getTypeIcon(spot.type)} {typeLabels[spot.type]}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {spot.rating && (
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                ⭐ {spot.rating}
              </div>
            )}
            <FavoriteButton spotId={spot.id} size="sm" />
          </div>
          {/* Spice badge */}
          {/* Bottom-left badges */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {spot.spice_level === 'none' && (
              <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                無辣 ✅
              </span>
            )}
            {spot.spice_level === 'mild' && (
              <span className="bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                微辣可調 ⚠️
              </span>
            )}
            {spot.tags?.includes('IG推薦') && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                IG推薦
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                {spot.name_zh}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 truncate" lang="ko">{spot.name_ko}</p>
            </div>
            <span className="text-xs text-blue-600 font-medium shrink-0 bg-blue-50 px-2 py-1 rounded-lg">
              {spot.district}
            </span>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed flex-1">
            {spot.description}
          </p>

          {/* Kid score */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
            <KidScore score={spot.kid_friendly_score} />
            <div className="flex items-center gap-2">
              {priceText && (
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-lg">
                  {priceText}
                </span>
              )}
              {spot.reservation_links && spot.reservation_links.length > 0 && (
                <span className="text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded-lg font-medium">
                  可訂位
                </span>
              )}
            </div>
          </div>

          {/* Open status badge */}
          {openStatus.status !== 'unknown' && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className={cn(
                'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                openStatus.status === 'open' && 'bg-green-50 text-green-700',
                openStatus.status === 'closing-soon' && 'bg-amber-50 text-amber-700',
                openStatus.status === 'closed' && 'bg-gray-100 text-gray-500',
              )}>
                <span className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  openStatus.status === 'open' && 'bg-green-500',
                  openStatus.status === 'closing-soon' && 'bg-amber-500 animate-pulse',
                  openStatus.status === 'closed' && 'bg-gray-400',
                )} aria-hidden="true" />
                {openStatus.label}
              </span>
              {openStatus.todayHours && (
                <span className="text-xs text-gray-400">{openStatus.todayHours}</span>
              )}
            </div>
          )}

          {/* Distance badge */}
          {distance !== undefined && (
            <p className="text-xs text-blue-600 font-medium mt-2 flex items-center gap-1">
              <span aria-hidden="true">📍</span>
              <span>{distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`} 距離你</span>
            </p>
          )}

          {/* Review count + pros preview */}
          {(spot.review_count || spot.review_summary?.pros?.[0]) && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              {spot.review_count && spot.review_count > 0 && (
                <span className="shrink-0 text-gray-400">{spot.review_count}+ 則評論</span>
              )}
              {spot.review_summary?.pros?.[0] && (
                <p className="flex gap-1 min-w-0">
                  <span className="text-green-500 shrink-0" aria-hidden="true">✓</span>
                  <span className="line-clamp-1">{spot.review_summary.pros[0]}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
})

export default SpotCard
