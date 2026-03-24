export type SpotType = 'restaurant' | 'cafe' | 'attraction' | 'park' | 'shopping' | 'activity'
export type PriceRange = 'free' | 'budget' | 'moderate' | 'expensive' | 'luxury'
export type SpiceLevel = 'none' | 'mild' | 'moderate' | 'spicy'

export interface Dish {
  name_ko: string
  name_zh: string
  price_krw: number
  description: string
  image_url?: string
  must_order?: boolean
}

export interface OpeningHours {
  mon?: string
  tue?: string
  wed?: string
  thu?: string
  fri?: string
  sat?: string
  sun?: string
  note?: string
}

export interface ReservationLink {
  platform: 'Catch Table' | 'KKday' | 'Klook' | 'Official' | 'AutoReserve' | 'Naver' | 'Email'
  url: string
  label: string
  note?: string
}

export interface ReviewSummary {
  pros: string[]   // 大家常提的優點
  cons: string[]   // 大家常提的缺點（排除極端/罕見意見）
}

export interface Spot {
  id: string
  slug: string
  name_ko: string
  name_zh: string
  name_en: string
  type: SpotType
  description: string
  address_ko: string
  address_zh: string
  district: string
  city: string
  lat: number
  lng: number
  image_url: string

  price_range: PriceRange
  avg_price_krw?: number

  opening_hours?: OpeningHours

  // kid-friendly
  kid_friendly_score: 1 | 2 | 3 | 4 | 5   // 5 = 最適合 2-6 歲
  kid_friendly_notes?: string               // 具體說明（高腳椅、遊樂設施等）
  min_age?: number                          // 建議最低年齡

  // restaurant
  spice_level?: SpiceLevel
  cuisine_type?: string[]
  recommended_dishes?: Dish[]
  ordering_tips?: string[]
  has_english_menu?: boolean
  accepts_card?: boolean
  reservation_required?: boolean
  reservation_links?: ReservationLink[]

  // attraction / park
  ticket_price_krw?: number
  ticket_price_free?: boolean
  booking_url?: string
  time_needed_minutes?: number
  best_time_to_visit?: string

  // reviews
  review_summary?: ReviewSummary
  tips?: string[]
  tags?: string[]

  rating?: number
  review_count?: number
}

export interface ItineraryScheduleItem {
  spotId: string
  start: string
  duration: number
  note?: string
}

export interface ItineraryDay {
  day: number
  title: string
  items: ItineraryScheduleItem[]
}

export interface SuggestedItinerary {
  id: string
  title: string
  days: number
  description: string
  image_url: string
  spotIds: string[]
  schedule: ItineraryDay[]
}
