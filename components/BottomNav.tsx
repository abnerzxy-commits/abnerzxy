'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', label: '首頁', icon: HomeIcon },
  { href: '/spots', label: '景點', icon: MapIcon },
  { href: '/itinerary', label: '行程', icon: CalendarIcon },
  { href: '/souvenirs', label: '伴手禮', icon: GiftIcon },
  { href: '/tips', label: '資訊', icon: InfoIcon },
]

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className={cn('w-5 h-5', active ? 'text-blue-600' : 'text-gray-400')} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
    </svg>
  )
}

function MapIcon({ active }: { active: boolean }) {
  return (
    <svg className={cn('w-5 h-5', active ? 'text-blue-600' : 'text-gray-400')} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function CalendarIcon({ active }: { active: boolean }) {
  return (
    <svg className={cn('w-5 h-5', active ? 'text-blue-600' : 'text-gray-400')} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function GiftIcon({ active }: { active: boolean }) {
  return (
    <svg className={cn('w-5 h-5', active ? 'text-blue-600' : 'text-gray-400')} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M12 8v13m0-13V6a4 4 0 00-4-4 4 4 0 00-4 4v2h8zm0 0V6a4 4 0 014-4 4 4 0 014 4v2h-8zM5 8h14a1 1 0 011 1v3H4V9a1 1 0 011-1zm0 4h14v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7z" />
    </svg>
  )
}

function InfoIcon({ active }: { active: boolean }) {
  return (
    <svg className={cn('w-5 h-5', active ? 'text-blue-600' : 'text-gray-400')} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] safe-area-bottom"
      role="navigation"
      aria-label="底部導航"
    >
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map(tab => {
          const active = isActive(tab.href)
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 py-1 rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-90',
                active
                  ? 'text-blue-600'
                  : 'text-gray-400 active:text-gray-600'
              )}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <span className="absolute -top-0.5 w-8 h-1 rounded-full bg-blue-600" aria-hidden="true" />
              )}
              <div className={cn(
                'flex items-center justify-center w-8 h-8 rounded-xl transition-colors duration-200',
                active ? 'bg-blue-50' : ''
              )}>
                <Icon active={active} />
              </div>
              <span className={cn(
                'text-[10px] leading-tight truncate',
                active ? 'font-bold' : 'font-medium'
              )}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
