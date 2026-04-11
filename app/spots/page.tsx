'use client'
import { useState, useMemo, useCallback } from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { spots, filterTypes } from '@/lib/data'
import SpotCard from '@/components/SpotCard'
import { useFavorites } from '@/components/useFavorites'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const SpotsMapView = dynamic(() => import('@/components/SpotsMapView'), {
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
      <div className="text-center">
        <div className="animate-spin text-3xl mb-2">🌍</div>
        <p className="text-sm">載入地圖中...</p>
      </div>
    </div>
  ),
  ssr: false,
})

const kidScoreOptions = [
  { value: 0, label: '全部' },
  { value: 4, label: '👶 親子適合（4星以上）' },
  { value: 5, label: '👶👶 超級親子（5星）' },
]

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function SpotsContent() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get('type') ?? 'all'
  const initialQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(initialQuery)
  const [typeFilter, setTypeFilter] = useState(initialType)
  const [kidFilter, setKidFilter] = useState(0)
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null)
  const [sortByDist, setSortByDist] = useState(false)
  const [gpsLoading, setGpsLoading] = useState(false)
  const [gpsError, setGpsError] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [showFavOnly, setShowFavOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const { favorites } = useFavorites()

  // Count active filters for badge display
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (typeFilter !== 'all') count++
    if (kidFilter > 0) count++
    if (showFavOnly) count++
    if (sortByDist) count++
    return count
  }, [typeFilter, kidFilter, showFavOnly, sortByDist])

  const requestGPS = useCallback(() => {
    if (gpsLoading) return
    if (!navigator.geolocation) {
      setGpsError('此裝置不支援 GPS 定位')
      return
    }
    setGpsLoading(true)
    setGpsError('')
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setSortByDist(true)
        setGpsLoading(false)
      },
      () => {
        setGpsError('無法取得位置，請確認已開啟定位權限')
        setGpsLoading(false)
      },
      { timeout: 10000 }
    )
  }, [gpsLoading])

  const filtered = useMemo(() => {
    const list = spots.filter(s => {
      const matchType = typeFilter === 'all' || (typeFilter === 'ig' ? s.tags?.includes('IG推薦') : s.type === typeFilter)
      const matchKid = kidFilter === 0 || s.kid_friendly_score >= kidFilter
      const matchQuery = !query || [s.name_zh, s.name_ko, s.description, s.district, ...(s.tags ?? [])].some(
        t => t?.toLowerCase().includes(query.toLowerCase())
      )
      const matchFav = !showFavOnly || favorites.includes(s.id)
      return matchType && matchKid && matchQuery && matchFav
    })

    if (sortByDist && userPos) {
      return list
        .map(s => ({ spot: s, dist: haversine(userPos.lat, userPos.lng, s.lat, s.lng) }))
        .sort((a, b) => a.dist - b.dist)
    }
    return list.map(s => ({ spot: s, dist: undefined }))
  }, [query, typeFilter, kidFilter, sortByDist, userPos, showFavOnly, favorites])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <BreadcrumbSchema items={[{ name: '景點餐廳', href: '/spots' }]} />
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">釜山景點・餐廳・公園</h1>
          <p className="text-gray-500 mt-1">共 {filtered.length} 個地點，全部以 2-6 歲小孩為優先考量</p>
        </div>
        {/* View mode toggle */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'list' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            列表
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'map' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            地圖
          </button>
        </div>
      </div>

      {/* Search + Filter toggle row */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <label htmlFor="spot-search" className="sr-only">搜尋景點、餐廳、公園</label>
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="spot-search"
            type="search"
            placeholder="搜尋景點、餐廳、公園、無辣..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-shadow hover:shadow-md"
            autoComplete="off"
          />
        </div>
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`md:hidden flex items-center gap-1.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all shrink-0 ${
            showFilters || activeFilterCount > 0
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
          }`}
          aria-expanded={showFilters}
          aria-controls="filter-panel"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          篩選
          {activeFilterCount > 0 && (
            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
              showFilters ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
            }`}>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Active filter chips (mobile, collapsed state) */}
      {!showFilters && activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 md:hidden">
          {typeFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {filterTypes.find(t => t.id === typeFilter)?.label}
              <button onClick={() => setTypeFilter('all')} className="ml-0.5 hover:text-blue-900" aria-label="移除類型篩選">×</button>
            </span>
          )}
          {kidFilter > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
              {kidScoreOptions.find(o => o.value === kidFilter)?.label}
              <button onClick={() => setKidFilter(0)} className="ml-0.5 hover:text-emerald-900" aria-label="移除親子篩選">×</button>
            </span>
          )}
          {showFavOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
              ❤️ 收藏
              <button onClick={() => setShowFavOnly(false)} className="ml-0.5 hover:text-red-900" aria-label="取消只看收藏">×</button>
            </span>
          )}
          {sortByDist && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              📍 距離排序
              <button onClick={() => { setSortByDist(false); setUserPos(null) }} className="ml-0.5 hover:text-blue-900" aria-label="取消距離排序">×</button>
            </span>
          )}
        </div>
      )}

      {/* Filter panel - always visible on desktop, collapsible on mobile */}
      <div
        id="filter-panel"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showFilters ? 'max-h-[500px] opacity-100 mb-5' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mb-5'
        }`}
      >
        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="類型篩選">
          {filterTypes.map(t => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id)}
              aria-pressed={typeFilter === t.id}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                typeFilter === t.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={() => setShowFavOnly(v => !v)}
            aria-pressed={showFavOnly}
            className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
              showFavOnly
                ? 'bg-red-500 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-500'
            }`}
          >
            {showFavOnly ? '❤️ 收藏中' : '🤍 只看收藏'}
          </button>
        </div>

        {/* Kid score filters */}
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="親子友善度篩選">
          {kidScoreOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setKidFilter(opt.value)}
              aria-pressed={kidFilter === opt.value}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                kidFilter === opt.value
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* GPS distance sort */}
        <div className="mb-4">
          {!userPos ? (
            <button
              onClick={requestGPS}
              disabled={gpsLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all disabled:opacity-50"
            >
              {gpsLoading
                ? <><span className="animate-spin">⏳</span> 取得位置中...</>
                : <><span>📍</span> 按距離排序（GPS）</>
              }
            </button>
          ) : (
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setSortByDist(v => !v)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  sortByDist
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                📍 {sortByDist ? '按距離排序中' : '按距離排序'}
              </button>
              <button
                onClick={() => { setUserPos(null); setSortByDist(false) }}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                取消定位
              </button>
            </div>
          )}
          {gpsError && <p className="text-xs text-red-500 mt-2">{gpsError}</p>}
        </div>

        {/* Clear all filters + Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setTypeFilter('all')
                setKidFilter(0)
                setShowFavOnly(false)
                setSortByDist(false)
                setUserPos(null)
                setQuery('')
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-medium hover:bg-gray-700 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              清除全部篩選
            </button>
          )}
          <span>👶 = 親子友善度（5格最高）</span>
          <span className="text-green-600 font-medium">無辣 ✅ = 完全無辣</span>
          <span className="text-yellow-600 font-medium">微辣可調 ⚠️ = 可要求不辣</span>
          <span className="text-rose-600 font-medium">可訂位 = 有訂位連結</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">找不到符合條件的地點</p>
          <p className="text-sm mt-1">試試其他關鍵字或取消篩選</p>
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setTypeFilter('all')
                setKidFilter(0)
                setShowFavOnly(false)
                setSortByDist(false)
                setUserPos(null)
                setQuery('')
              }}
              className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              清除所有篩選
            </button>
          )}
        </div>
      ) : viewMode === 'map' ? (
        <SpotsMapView spots={filtered} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(({ spot, dist }) => (
            <SpotCard key={spot.id} spot={spot} distance={dist} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function SpotsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-400">載入中...</div>}>
      <SpotsContent />
    </Suspense>
  )
}
