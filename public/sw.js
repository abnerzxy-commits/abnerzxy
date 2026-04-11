const CACHE_NAME = 'korea-travel-v3'
const MAX_CACHE_ITEMS = 200
const STATIC_ASSETS = [
  '/',
  '/spots',
  '/itinerary',
  '/souvenirs',
  '/tips',
  '/icon-192.png',
  '/icon-512.png',
]

/** Trim cache to max items (LRU-style: delete oldest entries first) */
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  if (keys.length > maxItems) {
    await Promise.all(keys.slice(0, keys.length - maxItems).map(k => cache.delete(k)))
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch((err) => console.warn('SW install cache failed:', err))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET, API requests, and Chrome extensions
  if (request.method !== 'GET') return
  if (url.pathname.startsWith('/api/')) return
  if (url.protocol === 'chrome-extension:') return
  if (url.origin !== self.location.origin && !url.hostname.includes('unsplash') && !url.hostname.includes('pstatic')) return

  // Images: cache-first for better performance
  if (url.pathname.startsWith('/images/') || url.pathname.startsWith('/_next/image')) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached || fetch(request).then((response) => {
          if (response.ok && response.status === 200) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone)
              trimCache(CACHE_NAME, MAX_CACHE_ITEMS)
            })
          }
          return response
        }).catch(() => cached || new Response('', { status: 404 }))
      )
    )
    return
  }

  // Static assets (fonts, JS, CSS): cache-first
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached || fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        }).catch(() => cached || new Response('', { status: 404 }))
      )
    )
    return
  }

  // Pages: network-first with cache fallback for better freshness
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return response
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
  )
})
