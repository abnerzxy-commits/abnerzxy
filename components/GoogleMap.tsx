'use client'

interface GoogleMapProps {
  lat: number
  lng: number
  name: string
  address: string
  zoom?: number
}

export default function GoogleMap({ lat, lng, name, address, zoom = 16 }: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const q = encodeURIComponent(`${name} ${address}`)
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${q}&center=${lat},${lng}&zoom=${zoom}&language=zh-TW`

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <iframe
        title={`${name} 地圖`}
        src={embedUrl}
        width="100%"
        height="280"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 bg-white text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        在 Google Maps 中開啟導航
      </a>
    </div>
  )
}
