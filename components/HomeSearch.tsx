'use client'
import { useState, useCallback, useMemo, useRef, useEffect, useId } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { spots } from '@/lib/data'
import { getTypeIcon } from '@/lib/utils'
import { typeLabels } from '@/lib/data'

// Slim record used only for client-side suggestion matching.
type Suggestion = {
  id: string
  slug: string
  name_zh: string
  name_ko: string
  type: string
  district: string
  image_url: string
  score: number
}

const MAX_SUGGESTIONS = 6

function matchScore(q: string, spot: typeof spots[number]): number {
  // Returns 0 if no match, higher = better relevance.
  const name = spot.name_zh.toLowerCase()
  const nameKo = spot.name_ko.toLowerCase()
  const nameEn = (spot.name_en ?? '').toLowerCase()
  const district = spot.district.toLowerCase()
  const desc = spot.description.toLowerCase()
  const tags = (spot.tags ?? []).join(' ').toLowerCase()

  if (name.startsWith(q)) return 100
  if (district === q) return 95
  if (name.includes(q)) return 80
  if (district.includes(q)) return 70
  if (nameKo.includes(q) || nameEn.includes(q)) return 60
  if (tags.includes(q)) return 50
  if (desc.includes(q)) return 30
  return 0
}

export default function HomeSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()

  const { suggestions, totalMatchCount } = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length === 0) return { suggestions: [] as Suggestion[], totalMatchCount: 0 }
    const scored = spots
      .map(s => ({
        id: s.id,
        slug: s.slug,
        name_zh: s.name_zh,
        name_ko: s.name_ko,
        type: s.type,
        district: s.district,
        image_url: s.image_url,
        score: matchScore(q, s),
      }))
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
    return {
      suggestions: scored.slice(0, MAX_SUGGESTIONS),
      totalMatchCount: scored.length,
    }
  }, [query])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      router.push(`/spots?q=${encodeURIComponent(q)}`)
    } else {
      router.push('/spots')
    }
    setIsOpen(false)
    inputRef.current?.blur()
  }, [query, router])

  const handleSelectSuggestion = useCallback((s: Suggestion) => {
    setIsOpen(false)
    setQuery('')
    router.push(`/spots/${s.slug}`)
  }, [router])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  // Reset active item when suggestions change
  useEffect(() => {
    setActiveIndex(-1)
  }, [query])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault()
        handleSelectSuggestion(suggestions[activeIndex])
      }
      // Otherwise let form submit
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
    }
  }, [isOpen, suggestions, activeIndex, handleSelectSuggestion])

  const showDropdown = isOpen && query.trim().length > 0

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="home-search" className="sr-only">搜尋景點、餐廳、公園</label>
        <div
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-owns={listboxId}
          aria-haspopup="listbox"
          className="relative"
        >
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            id="home-search"
            type="search"
            placeholder="搜尋景點、餐廳、公園、無辣..."
            value={query}
            onChange={e => { setQuery(e.target.value); setIsOpen(true) }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-24 py-4 bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg text-base"
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-gray-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
            aria-label="搜尋景點餐廳"
          >
            搜尋
          </button>
        </div>
      </form>

      {/* Autocomplete dropdown */}
      {showDropdown && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="搜尋建議"
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-left"
        >
          {suggestions.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              <span aria-hidden="true" className="block text-2xl mb-1">🔍</span>
              找不到相關地點，按 <span className="font-semibold text-gray-700">「搜尋」</span> 看完整結果
            </div>
          ) : (
            <>
              <ul className="max-h-[60vh] overflow-y-auto">
                {suggestions.map((s, i) => (
                  <li
                    key={s.id}
                    id={`${listboxId}-option-${i}`}
                    role="option"
                    aria-selected={activeIndex === i}
                  >
                    <button
                      type="button"
                      onMouseDown={e => { e.preventDefault(); handleSelectSuggestion(s) }}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                        activeIndex === i ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <Image
                          src={s.image_url}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{s.name_zh}</p>
                        <p className="text-xs text-gray-500 truncate flex items-center gap-1.5">
                          <span aria-hidden="true">{getTypeIcon(s.type)}</span>
                          <span>{typeLabels[s.type] ?? s.type}</span>
                          <span className="text-gray-300">·</span>
                          <span>{s.district}</span>
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              {totalMatchCount > suggestions.length && (
                <button
                  type="button"
                  onMouseDown={e => {
                    e.preventDefault()
                    setIsOpen(false)
                    router.push(`/spots?q=${encodeURIComponent(query.trim())}`)
                  }}
                  className="w-full text-center px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 border-t border-gray-100 transition-colors"
                >
                  查看全部 {totalMatchCount} 個結果 →
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
