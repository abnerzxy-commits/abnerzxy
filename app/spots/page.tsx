'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { spots, typeLabels, priceLabels, cities } from '@/lib/data'
import SpotCard from '@/components/SpotCard'

const types = [
  { id: 'all', label: '全部類型' },
  { id: 'restaurant', label: '🍽 餐廳' },
  { id: 'cafe', label: '☕ 咖啡廳' },
  { id: 'attraction', label: '🏛 景點' },
  { id: 'activity', label: '🏃 活動' },
  { id: 'shopping', label: '🛍 購物' },
]

function SpotsContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [cityFilter, setCityFilter] = useState(searchParams.get('city') ?? '全部')

  const filtered = useMemo(() => {
    return spots.filter(s => {
      const matchType = typeFilter === 'all' || s.type === typeFilter
      const matchCity = cityFilter === '全部' || s.city === cityFilter
      const matchQuery = !query || [s.name_zh, s.name_ko, s.description, s.district, ...(s.tags ?? [])].some(
        t => t?.toLowerCase().includes(query.toLowerCase())
      )
      return matchType && matchCity && matchQuery
    })
  }, [query, typeFilter, cityFilter])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">景點與餐廳</h1>
        <p className="text-gray-500 mt-1">共 {filtered.length} 個地點</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="搜尋景點、餐廳、菜名、地區..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* City */}
        <div className="flex gap-2 flex-wrap">
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setCityFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                cityFilter === c
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="w-full border-t border-gray-100" />
        {/* Type */}
        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                typeFilter === t.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">找不到符合條件的地點</p>
          <p className="text-sm mt-1">試試其他關鍵字或取消篩選</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(spot => <SpotCard key={spot.id} spot={spot} />)}
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
