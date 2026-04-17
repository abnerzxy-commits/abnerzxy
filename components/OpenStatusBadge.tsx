'use client'
import { useEffect, useState } from 'react'
import { getOpenStatus, type OpenStatusResult } from '@/lib/utils'
import type { OpeningHours } from '@/lib/types'
import { cn } from '@/lib/utils'

export function OpenStatusBadge({ openingHours }: { openingHours?: OpeningHours }) {
  const [status, setStatus] = useState<OpenStatusResult | null>(null)

  useEffect(() => {
    setStatus(getOpenStatus(openingHours))
    // Update every minute
    const timer = setInterval(() => {
      setStatus(getOpenStatus(openingHours))
    }, 60000)
    return () => clearInterval(timer)
  }, [openingHours])

  if (!status || status.status === 'unknown') return null

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full',
      status.status === 'open' && 'bg-green-100 text-green-800',
      status.status === 'closing-soon' && 'bg-amber-100 text-amber-800',
      status.status === 'closed' && 'bg-gray-100 text-gray-600',
    )}>
      <span className={cn(
        'w-2 h-2 rounded-full',
        status.status === 'open' && 'bg-green-500',
        status.status === 'closing-soon' && 'bg-amber-500 animate-pulse',
        status.status === 'closed' && 'bg-gray-400',
      )} aria-hidden="true" />
      {status.label}
    </span>
  )
}

export function OpenStatusDayHighlight({ openingHours }: { openingHours?: OpeningHours }) {
  const [currentDay, setCurrentDay] = useState<string | null>(null)

  useEffect(() => {
    const now = new Date()
    const kst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    setCurrentDay(days[kst.getDay()])
  }, [])

  if (!openingHours || !currentDay) return null

  const dayLabels: Record<string, string> = { mon: '週一', tue: '週二', wed: '週三', thu: '週四', fri: '週五', sat: '週六', sun: '週日' }

  return (
    <div className="space-y-1 text-sm">
      {(['mon','tue','wed','thu','fri','sat','sun'] as const).map(day => {
        const val = openingHours[day]
        if (!val) return null
        const isToday = day === currentDay
        return (
          <div key={day} className={cn(
            'flex justify-between px-2 py-1 rounded-lg transition-colors',
            isToday && 'bg-blue-50 font-semibold'
          )}>
            <span className={cn('text-gray-500', isToday && 'text-blue-700')}>
              {dayLabels[day]}{isToday && ' (今天)'}
            </span>
            <span className={cn('text-gray-900 font-medium', isToday && 'text-blue-900')}>
              {val}
            </span>
          </div>
        )
      })}
    </div>
  )
}
