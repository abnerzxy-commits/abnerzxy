import Link from 'next/link'
import Image from 'next/image'
import { Spot } from '@/lib/types'
import { cn, formatKRW, getPriceRangeEmoji, getTypeColor, getTypeIcon } from '@/lib/utils'
import { typeLabels } from '@/lib/data'

export default function SpotCard({ spot }: { spot: Spot }) {
  const priceText = spot.ticket_price_free
    ? '免費'
    : spot.ticket_price_krw
    ? formatKRW(spot.ticket_price_krw)
    : spot.avg_price_krw
    ? `約 ${formatKRW(spot.avg_price_krw)}/人`
    : getPriceRangeEmoji(spot.price_range)

  return (
    <Link href={`/spots/${spot.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <Image
            src={spot.image_url}
            alt={spot.name_zh}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className={cn('text-xs font-medium px-2 py-1 rounded-full', getTypeColor(spot.type))}>
              {getTypeIcon(spot.type)} {typeLabels[spot.type]}
            </span>
          </div>
          {spot.rating && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-700 flex items-center gap-1">
              ⭐ {spot.rating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                {spot.name_zh}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{spot.name_ko}</p>
            </div>
            <span className="text-xs text-blue-600 font-medium shrink-0 bg-blue-50 px-2 py-1 rounded-lg">
              {spot.district}
            </span>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
            {spot.description}
          </p>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
            <span className="text-sm font-medium text-green-700">{priceText}</span>
            {spot.time_needed_minutes && (
              <span className="text-xs text-gray-400">⏱ {Math.round(spot.time_needed_minutes / 60 * 10) / 10}小時</span>
            )}
            {spot.recommended_dishes && spot.recommended_dishes.length > 0 && (
              <span className="text-xs text-orange-500 ml-auto">🍽 {spot.recommended_dishes.length}道推薦菜</span>
            )}
          </div>

          {/* Tags */}
          {spot.tags && spot.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {spot.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
