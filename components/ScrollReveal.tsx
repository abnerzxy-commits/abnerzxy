'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

// Shared IntersectionObserver — one observer handles ALL ScrollReveal elements.
// This avoids creating N observers on pages with many animated sections (e.g. homepage).
type ObserverCallback = (entry: IntersectionObserverEntry) => void
const callbacks = new Map<Element, ObserverCallback>()
let sharedObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const cb = callbacks.get(entry.target)
        if (cb) cb(entry)
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  )
  return sharedObserver
}

function observe(el: Element, cb: ObserverCallback) {
  callbacks.set(el, cb)
  getObserver().observe(el)
}

function unobserve(el: Element) {
  callbacks.delete(el)
  getObserver().unobserve(el)
  // Clean up shared observer when no elements remain
  if (callbacks.size === 0 && sharedObserver) {
    sharedObserver.disconnect()
    sharedObserver = null
  }
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const handleIntersect = useCallback((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      setVisible(true)
      unobserve(entry.target)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If already in viewport on mount, reveal immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      return
    }

    observe(el, handleIntersect)
    return () => unobserve(el)
  }, [handleIntersect])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
