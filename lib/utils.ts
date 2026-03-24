import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatKRW(amount: number): string {
  return `₩${amount.toLocaleString()}`
}

export function formatKRWtoTWD(krw: number): string {
  const twd = Math.round(krw * 0.023)
  return `約 NT$${twd}`
}

export function getPriceRangeEmoji(range: string): string {
  const map: Record<string, string> = {
    budget: '₩',
    moderate: '₩₩',
    expensive: '₩₩₩',
    luxury: '₩₩₩₩',
  }
  return map[range] ?? '₩'
}

export function getTypeColor(type: string): string {
  const map: Record<string, string> = {
    restaurant: 'bg-orange-100 text-orange-700',
    cafe: 'bg-amber-100 text-amber-700',
    attraction: 'bg-blue-100 text-blue-700',
    park: 'bg-green-100 text-green-700',
    shopping: 'bg-pink-100 text-pink-700',
    activity: 'bg-teal-100 text-teal-700',
  }
  return map[type] ?? 'bg-gray-100 text-gray-700'
}

export function getTypeIcon(type: string): string {
  const map: Record<string, string> = {
    restaurant: '🍽️',
    cafe: '☕',
    attraction: '🎡',
    park: '🌳',
    shopping: '🛍️',
    activity: '🏃',
  }
  return map[type] ?? '📍'
}

export function minutesToHoursText(minutes: number): string {
  if (minutes < 60) return `${minutes}分鐘`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}小時${m}分鐘` : `${h}小時`
}
