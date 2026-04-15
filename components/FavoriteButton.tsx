'use client'
import { useFavorites } from './useFavorites'
import { trackEvent } from '@/lib/analytics'

interface FavoriteButtonProps {
  spotId: string
  size?: 'sm' | 'md'
  className?: string
}

export default function FavoriteButton({ spotId, size = 'sm', className = '' }: FavoriteButtonProps) {
  const { toggle, isFavorite } = useFavorites()
  const active = isFavorite(spotId)

  const sizeClasses = size === 'md'
    ? 'w-10 h-10 text-xl'
    : 'w-8 h-8 text-base'

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        trackEvent('favorite_toggle', { spot_id: spotId, action: active ? 'remove' : 'add' })
        toggle(spotId)
      }}
      aria-label={active ? '取消收藏' : '加入收藏'}
      aria-pressed={active}
      className={`${sizeClasses} flex items-center justify-center rounded-full transition-all duration-200 active:scale-90 ${
        active
          ? 'bg-red-50 text-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.25)] scale-110'
          : 'bg-white/80 text-gray-400 hover:text-red-400 hover:bg-red-50 backdrop-blur-sm shadow-sm'
      } ${className}`}
    >
      {active ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className={size === 'md' ? 'w-6 h-6' : 'w-5 h-5'}>
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={size === 'md' ? 'w-6 h-6' : 'w-5 h-5'}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )}
    </button>
  )
}
