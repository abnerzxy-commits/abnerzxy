import Link from 'next/link'
import Image from 'next/image'
import { Spot } from '@/lib/types'
import { cn, formatKRW, getTypeColor, getTypeIcon } from '@/lib/utils'
import { typeLabels } from '@/lib/data'

function KidScore({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1" title={`親子友善度 ${score}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-xs ${i < score ? 'opacity-100' : 'opacity-20'}`}>👶</span>
      ))}
    </div>
  )
}

export default function SpotCard({ spot, distance }: { spot: Spot; distance?: number }) {
  const priceText = spot.ticket_price_free
    ? '免費'
    : spot.ticket_price_krw
    ? formatKRW(spot.ticket_price_krw)
    : spot.avg_price_krw
    ? `約 ${formatKRW(spot.avg_price_krw)}/人`
    : null

  return (
    <Link href={`/spots/${spot.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-44 bg-gray-200 overflow-hidden shrink-0">
          <Image
            src={spot.image_url}
            alt={spot.name_zh}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className={cn('text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm', getTypeColor(spot.type))}>
              {getTypeIcon(spot.type)} {typeLabels[spot.type]}
            </span>
          </div>
          {spot.rating && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
              ⭐ {spot.rating}
            </div>
          )}
          {/* Spice badge */}
          {spot.spice_level === 'none' && (
            <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              無辣 ✅
            </div>
          )}
          {spot.spice_level === 'mild' && (
            <div className="absolute bottom-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              微辣可調 ⚠️
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                {spot.name_zh}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{spot.name_ko}</p>
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

          {/* Distance badge */}
          {distance !== undefined && (
            <p className="text-xs text-blue-600 font-medium mt-1.5 flex items-center gap-1">
              <span>📍</span>
              <span>{distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`} 距離你</span>
            </p>
          )}

          {/* Quick pros preview */}
          {spot.review_summary?.pros?.[0] && (
            <p className="text-xs text-gray-400 mt-2 flex gap-1.5">
              <span className="text-green-500 shrink-0">✓</span>
              <span className="line-clamp-1">{spot.review_summary.pros[0]}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
