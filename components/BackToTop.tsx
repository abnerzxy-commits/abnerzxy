'use client'

import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 md:bottom-8 right-4 z-40 w-11 h-11 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 hover:text-blue-600 hover:shadow-[0_8px_24px_rgba(59,130,246,0.2)] hover:scale-110 hover:border-blue-200 transition-all duration-200 animate-fade-in"
      aria-label="回到頂部"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
