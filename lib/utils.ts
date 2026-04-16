import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SuggestedItinerary, Spot, TravelFromPrev } from './types'

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

// 交通模式單次費用估算（每趟總計，非每人）— 參考釜山當地 2025 年常見行情
const TRANSPORT_COST_KRW: Record<TravelFromPrev['mode'], number> = {
  walk: 0,
  subway: 1550,     // 單程票一人（家族至少 2 人，下方 x2）
  bus: 1550,
  capsule: 7000,    // 膠囊列車單程一人
  taxi: 6000,       // 市區短程
  uber: 8000,       // Uber 稍貴於一般計程車
  chartered: 0,     // 包車以日計費，另外列
}

// 每天包車費用（8 小時）
const CHARTERED_DAY_KRW = 220000

// 餐廳若無 avg_price_krw，依 price_range 推估（每人）
const RESTAURANT_AVG_BY_RANGE_KRW: Record<string, number> = {
  free: 0,
  budget: 8000,
  moderate: 15000,
  expensive: 28000,
  luxury: 50000,
}

export interface ItineraryCostBreakdown {
  tickets: number       // 門票費用（全家總計）
  meals: number         // 餐費（全家總計）
  transport: number     // 交通費用（全家總計）
  perDay: number[]      // 每天總花費
  total: number
  adults: number
  children: number
}

/**
 * 預估整個行程的花費（全家）
 * 預設以 2 大人 + 1 小孩（4 歲）計算
 */
export function estimateItineraryCost(
  itin: SuggestedItinerary,
  spotsData: Spot[],
  opts: { adults?: number; children?: number } = {}
): ItineraryCostBreakdown {
  const adults = opts.adults ?? 2
  const children = opts.children ?? 1
  const paying = adults + children      // 通常門票成人/兒童差異不大，簡化估算
  const perDay: number[] = []
  let tickets = 0
  let meals = 0
  let transport = 0

  for (const day of itin.schedule) {
    let dayTotal = 0
    let hasChartered = false

    for (const item of day.items) {
      const spot = item.spotId ? spotsData.find(s => s.id === item.spotId) : null

      if (spot) {
        if (spot.type === 'restaurant' || spot.type === 'cafe' || spot.type === 'dessert') {
          const perPerson = spot.avg_price_krw ?? RESTAURANT_AVG_BY_RANGE_KRW[spot.price_range] ?? 0
          const mealCost = perPerson * paying
          meals += mealCost
          dayTotal += mealCost
        } else if (!spot.ticket_price_free && spot.ticket_price_krw) {
          const ticketCost = spot.ticket_price_krw * paying
          tickets += ticketCost
          dayTotal += ticketCost
        }
      }

      if (item.travelFromPrev) {
        const mode = item.travelFromPrev.mode
        if (mode === 'chartered') {
          hasChartered = true
        } else if (mode === 'subway' || mode === 'bus') {
          const cost = TRANSPORT_COST_KRW[mode] * paying
          transport += cost
          dayTotal += cost
        } else {
          // taxi / uber / capsule — 一趟車非按人數，但 capsule 是按人
          const cost = mode === 'capsule' ? TRANSPORT_COST_KRW[mode] * paying : TRANSPORT_COST_KRW[mode]
          transport += cost
          dayTotal += cost
        }
      }
    }

    if (hasChartered) {
      transport += CHARTERED_DAY_KRW
      dayTotal += CHARTERED_DAY_KRW
    }

    perDay.push(dayTotal)
  }

  return {
    tickets,
    meals,
    transport,
    perDay,
    total: tickets + meals + transport,
    adults,
    children,
  }
}

/** 行程包含的主要交通方式（用於卡片摘要） */
export function getItineraryTransportModes(itin: SuggestedItinerary): string[] {
  const modes = new Set<string>()
  for (const day of itin.schedule) {
    for (const item of day.items) {
      if (item.travelFromPrev?.mode) modes.add(item.travelFromPrev.mode)
    }
  }
  const priority: TravelFromPrev['mode'][] = ['chartered', 'uber', 'taxi', 'capsule', 'subway', 'bus', 'walk']
  return priority.filter(m => modes.has(m))
}

const MODE_LABEL: Record<string, { icon: string; label: string }> = {
  walk: { icon: '🚶', label: '步行' },
  chartered: { icon: '🚐', label: '包車' },
  uber: { icon: '🚕', label: 'Uber' },
  capsule: { icon: '🚃', label: '膠囊列車' },
  subway: { icon: '🚇', label: '地鐵' },
  taxi: { icon: '🚕', label: '計程車' },
  bus: { icon: '🚌', label: '公車' },
}

export function getTransportLabel(mode: string): { icon: string; label: string } {
  return MODE_LABEL[mode] ?? { icon: '📌', label: mode }
}
