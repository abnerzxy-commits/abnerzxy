'use client'

interface NaverMapProps {
  lat: number
  lng: number
  name: string
  address: string
}

export default function NaverMap({ lat, lng, name, address }: NaverMapProps) {
  const encodedName = encodeURIComponent(name)
  // nmap:// deep link opens Naver Map app directly
  const appNavLink = `nmap://route/car?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=koreatravel`
  const appPlaceLink = `nmap://place?lat=${lat}&lng=${lng}&name=${encodedName}&appname=koreatravel`
  // Web fallback
  const webLink = `https://map.naver.com/p/search/${encodedName}?c=${lng},${lat},16,0,0,0,dh`

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
      {/* Address bar */}
      <div className="px-4 py-3 bg-green-50 border-b border-green-100">
        <p className="text-xs text-green-700 font-semibold mb-0.5">📍 地址</p>
        <p className="text-sm text-gray-800 font-medium leading-snug">{address}</p>
        <p className="text-xs text-gray-400 mt-0.5">{name}</p>
      </div>

      {/* Navigation buttons */}
      <div className="p-3 space-y-2">
        {/* Primary: open app navigation */}
        <a
          href={appNavLink}
          className="flex items-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-3 transition-colors"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold">Naver Map 導航（App）</p>
            <p className="text-xs opacity-80">開車路線規劃</p>
          </div>
        </a>

        {/* Show place in app */}
        <a
          href={appPlaceLink}
          className="flex items-center gap-3 w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl px-4 py-3 transition-colors"
        >
          <svg className="w-5 h-5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium">在 Naver Map App 查看</p>
            <p className="text-xs text-gray-400">顯示店家位置</p>
          </div>
        </a>

        {/* Web fallback */}
        <a
          href={webLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          用瀏覽器開啟地圖
        </a>
      </div>
    </div>
  )
}
