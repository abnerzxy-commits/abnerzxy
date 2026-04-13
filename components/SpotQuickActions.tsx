'use client'
import { useRef, useEffect } from 'react'

interface SpotQuickActionsProps {
  nameKo: string
  lat: number
  lng: number
  firstReservationUrl?: string
  hasReservation: boolean
}

export default function SpotQuickActions({ nameKo, lat, lng, firstReservationUrl, hasReservation }: SpotQuickActionsProps) {
  const encodedName = encodeURIComponent(nameKo)
  const navLink = `nmap://route/car?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=koreatravel`
  const webMapLink = `https://map.naver.com/p/search/${encodedName}?c=${lng},${lat},16,0,0,0,dh`
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
    }
  }, [])

  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-3 pb-2 safe-area-bottom">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-2 flex gap-2">
        {/* Navigate button */}
        <a
          href={navLink}
          onClick={() => {
            if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
            const onHidden = () => {
              if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
              document.removeEventListener('visibilitychange', onHidden)
            }
            document.addEventListener('visibilitychange', onHidden)
            fallbackTimerRef.current = setTimeout(() => {
              document.removeEventListener('visibilitychange', onHidden)
              window.location.href = webMapLink
            }, 2500)
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          aria-label={`導航到 ${nameKo}`}
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          導航前往
        </a>

        {/* Reserve button */}
        {hasReservation && firstReservationUrl ? (
          <a
            href={firstReservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            aria-label="立即訂位"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            立即訂位
          </a>
        ) : (
          <button
            type="button"
            onClick={() => {
              document.querySelector('[data-section="map"]')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            aria-label="查看地圖"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            查看地圖
          </button>
        )}
      </div>
    </div>
  )
}
