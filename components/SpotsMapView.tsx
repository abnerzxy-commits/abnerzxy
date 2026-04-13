'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { Spot } from '@/lib/types'
import { getTypeIcon } from '@/lib/utils'
import { typeLabels } from '@/lib/constants'

interface SpotsMapViewProps {
  spots: { spot: Spot; dist?: number }[]
}

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (el: HTMLElement, opts: Record<string, unknown>) => NaverMapInstance
        LatLng: new (lat: number, lng: number) => NaverLatLng
        Marker: new (opts: Record<string, unknown>) => NaverMarker
        LatLngBounds: new (sw: NaverLatLng, ne: NaverLatLng) => NaverLatLngBounds
        Event: {
          addListener: (target: unknown, event: string, handler: () => void) => void
        }
      }
    }
    initNaverMap?: () => void
  }
}

interface NaverLatLng {
  lat(): number
  lng(): number
}
interface NaverLatLngBounds {
  extend(latlng: NaverLatLng): NaverLatLngBounds
}
interface NaverMapInstance {
  fitBounds(bounds: NaverLatLngBounds, padding?: Record<string, number>): void
  panTo(latlng: NaverLatLng): void
}
interface NaverMarker {
  setMap(map: NaverMapInstance | null): void
  getPosition(): NaverLatLng
}

export default function SpotsMapView({ spots }: SpotsMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<NaverMapInstance | null>(null)
  const markersRef = useRef<NaverMarker[]>([])
  const [loaded, setLoaded] = useState(false)
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)

  // Close popup on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedSpot(null)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Load Naver Maps script
  useEffect(() => {
    // Already loaded
    if (window.naver?.maps) {
      setLoaded(true)
      return
    }

    // Check if script already loading or loaded
    const existing = document.querySelector('script[src*="openapi.map.naver.com"]')
    if (existing) {
      // Script exists — check if naver is already available (loaded but callback missed)
      if (window.naver?.maps) {
        setLoaded(true)
        return
      }
      // Script is still loading — listen for its load event
      const onLoad = () => setLoaded(true)
      existing.addEventListener('load', onLoad)
      // Also set callback in case it hasn't fired yet
      window.initNaverMap = () => setLoaded(true)
      return () => {
        existing.removeEventListener('load', onLoad)
      }
    }

    window.initNaverMap = () => setLoaded(true)

    const script = document.createElement('script')
    const naverKey = process.env.NEXT_PUBLIC_NAVER_MAP_KEY
    if (!naverKey) {
      console.warn('NEXT_PUBLIC_NAVER_MAP_KEY is not set')
      return
    }
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverKey}&callback=initNaverMap`
    script.async = true
    document.head.appendChild(script)

    return () => {
      delete window.initNaverMap
    }
  }, [])

  // Initialize map and markers
  useEffect(() => {
    if (!loaded || !mapRef.current || spots.length === 0) return

    const { naver } = window
    if (!naver?.maps) return

    // Center on Busan
    const center = new naver.maps.LatLng(35.1796, 129.0756)

    const map = new naver.maps.Map(mapRef.current, {
      center,
      zoom: 12,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: true,
      zoomControlOptions: {
        position: 3, // TOP_RIGHT
      },
    })

    mapInstanceRef.current = map

    // Clear old markers
    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []

    // Build bounds
    const bounds = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(spots[0].spot.lat, spots[0].spot.lng),
      new naver.maps.LatLng(spots[0].spot.lat, spots[0].spot.lng)
    )

    spots.forEach(({ spot }) => {
      const pos = new naver.maps.LatLng(spot.lat, spot.lng)
      bounds.extend(pos)

      const marker = new naver.maps.Marker({
        position: pos,
        map,
        title: spot.name_zh,
        icon: {
          content: `<div style="background:white;border:2px solid #3B82F6;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,0.2);cursor:pointer;">${getTypeIcon(spot.type)}</div>`,
          anchor: { x: 16, y: 16 },
        },
      })

      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedSpot(spot)
        map.panTo(pos)
      })

      markersRef.current.push(marker)
    })

    if (spots.length > 1) {
      map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 })
    }
  }, [loaded, spots])

  return (
    <div className="relative w-full">
      {/* Map container */}
      <div
        ref={mapRef}
        className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-100"
      >
        {!loaded && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="animate-spin text-3xl mb-2">&#x1F30D;</div>
              <p className="text-sm">載入地圖中...</p>
            </div>
          </div>
        )}
      </div>

      {/* Info popup */}
      {selectedSpot && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 animate-fade-in">
          <button
            onClick={() => setSelectedSpot(null)}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors text-sm"
            aria-label="關閉"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="pr-6">
            <span className="text-xs text-gray-500">
              {getTypeIcon(selectedSpot.type)} {typeLabels[selectedSpot.type]}
            </span>
            <h3 className="font-bold text-gray-900 mt-0.5">{selectedSpot.name_zh}</h3>
            <p className="text-xs text-gray-400" lang="ko">{selectedSpot.name_ko}</p>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{selectedSpot.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{selectedSpot.district}</span>
              {selectedSpot.rating && (
                <span className="text-xs text-gray-500">&#x2B50; {selectedSpot.rating}</span>
              )}
            </div>
            <Link
              href={`/spots/${selectedSpot.slug}`}
              className="inline-block mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              查看詳情 &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
