'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      router.push(`/spots?q=${encodeURIComponent(q)}`)
    } else {
      router.push('/spots')
    }
  }, [query, router])

  return (
    <form onSubmit={handleSubmit} className="relative">
      <label htmlFor="home-search" className="sr-only">搜尋景點、餐廳、公園</label>
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        id="home-search"
        type="search"
        placeholder="搜尋景點、餐廳、公園、無辣..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full pl-12 pr-24 py-4 bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg text-base"
        autoComplete="off"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
      >
        搜尋
      </button>
    </form>
  )
}
