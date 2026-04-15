import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatKRW(amount: number): string {
  return `₩${amount.toLocaleString()}`
}

export function formatKRWtoTWD(krw: number): string {
  const twd = Math.round(krw * 0.025)
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
    dessert: 'bg-purple-100 text-purple-700',
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
    dessert: '🍰',
  }
  return map[type] ?? '📍'
}

export function minutesToHoursText(minutes: number): string {
  if (minutes < 60) return `${minutes}分鐘`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}小時${m}分鐘` : `${h}小時`
}

/** Haversine distance in km between two GPS coordinates */
export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`
  return `${km.toFixed(1)}km`
}

export function walkingTime(km: number): string {
  const minutes = Math.round(km * 12) // 5km/h = 12 min/km
  if (minutes < 60) return `步行約 ${minutes} 分鐘`
  return `步行約 ${Math.round(minutes / 10) * 10} 分鐘`
}
