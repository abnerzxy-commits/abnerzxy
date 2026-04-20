'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Animated count-up number that triggers when scrolled into view.
 * Parses the leading digits from `value` (e.g. "26" from "26" or "8+" from "8+"),
 * animates from 0 to that number, then appends any trailing suffix.
 */
export default function CountUp({
  value,
  duration = 1200,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState('0')
  const [started, setStarted] = useState(false)

  // Parse numeric part and suffix
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value

  const animate = useCallback(() => {
    if (target === 0) {
      setDisplay(value)
      return
    }

    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)
      setDisplay(`${current}${suffix}`)
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [target, suffix, duration, value])

  useEffect(() => {
    const el = ref.current
    if (!el || started) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, started])

  return (
    <span ref={ref} className={className}>
      {started ? display : '0'}
    </span>
  )
}
