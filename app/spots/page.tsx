'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { spots, filterTypes } from '@/lib/data'
import SpotCard from '@/components/SpotCard'

const kidScoreOptions = [
  { value: 0, label: '全部' },
  { value: 4, label: '👶 親子適合（4星以上）' },
  { value: 5, label: '👶👶 超級親子（5星）' },
]

function SpotsContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [kidFilter, setKidFilter] = useState(0)

  const filtered = useMemo(() => {
    return spots.filter(s => {
      const matchType = typeFilter === 'all' || s.type === typeFilter
      const matchKid = kidFilter === 0 || s.kid_friendly_score >= kidFilter
      const matchQuery = !query || [s.name_zh, s.name_ko, s.description, s.district, ...(s.tags ?? [])].some(
        t => t?.toLowerCase().includes(query.toLowerCase())
      )
      return matchType && matchKid && matchQuery
    })
  }, [query, typeFilter, kidFilter])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">釜山景點・餐廳・公園</h1>
        <p className="text-gray-500 mt-1">共 {filtered.length} 個地點，全部以 2-6 歲小孩為優先考量</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="搜尋景點、餐廳、公園、無辣..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Type */}
        {filterTypes.map(t => (
          <button
            key={t.id}
            onClick={() => setTypeFilter(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              typeFilter === t.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="w-full h-px bg-gray-100" />
        {/* Kid filter */}
        {kidScoreOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setKidFilter(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              kidFilter === opt.value
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs text-gray-500">
        <span>👶 = 親子友善度（5格最高）</span>
        <span className="text-green-600 font-medium">無辣 ✅ = 完全無辣</span>
        <span className="text-yellow-600 font-medium">微辣可調 ⚠️ = 可要求不辣</span>
        <span className="text-rose-600 font-medium">可訂位 = 有訂位連結</span>
      </div>

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
