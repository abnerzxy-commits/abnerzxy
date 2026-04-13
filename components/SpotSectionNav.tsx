'use client'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Section {
  id: string
  label: string
  icon: string
}

export default function SpotSectionNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const activeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Show nav only after scrolling past the hero image
    const heroObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    const hero = document.querySelector('[data-spot-hero]')
    if (hero) heroObserver.observe(hero)

    // Track which section is in view
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 }
    )

    for (const sec of sections) {
      const el = document.getElementById(sec.id)
      if (el) sectionObserver.observe(el)
    }

    return () => {
      heroObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [sections])

  // Auto-scroll the nav to keep active button visible
  useEffect(() => {
    if (activeBtnRef.current && navRef.current) {
      const nav = navRef.current
      const btn = activeBtnRef.current
      const navRect = nav.getBoundingClientRect()
      const btnRect = btn.getBoundingClientRect()
      if (btnRect.left < navRect.left || btnRect.right > navRect.right) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [activeId])

  if (!isVisible) return null

  return (
    <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm animate-fade-in">
      <div
        ref={navRef}
        className="flex items-center gap-1 px-3 py-2 overflow-x-auto scrollbar-hide"
        role="navigation"
        aria-label="頁面段落導航"
      >
        {sections.map(sec => {
          const isActive = activeId === sec.id
          return (
            <button
              key={sec.id}
              ref={isActive ? activeBtnRef : undefined}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => {
                const el = document.getElementById(sec.id)
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 110
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0',
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              )}
            >
              <span aria-hidden="true">{sec.icon}</span>
              {sec.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
