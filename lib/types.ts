export type SpotType = 'restaurant' | 'cafe' | 'attraction' | 'accommodation' | 'shopping' | 'activity'
export type PriceRange = 'budget' | 'moderate' | 'expensive' | 'luxury'

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
  images?: string[]
  price_range: PriceRange
  avg_price_krw?: number
  opening_hours?: OpeningHours
  // restaurant only
  cuisine_type?: string[]
  recommended_dishes?: Dish[]
  ordering_tips?: string[]
  has_english_menu?: boolean
  accepts_card?: boolean
  reservation_required?: boolean
  reservation_url?: string
  // attraction only
  ticket_price_krw?: number
  ticket_price_free?: boolean
  booking_url?: string
  time_needed_minutes?: number
  best_time_to_visit?: string
  tips?: string[]
  // meta
  tags?: string[]
  youtube_sources?: YoutubeSource[]
  rating?: number
  review_count?: number
}

export interface YoutubeSource {
  url: string
  title: string
  creator: string
  thumbnail?: string
}

export interface ItineraryItem {
  id: string
  spot: Spot
  day: number
  start_time: string
  duration_minutes: number
  notes?: string
  transport_to_next?: 'walk' | 'subway' | 'taxi' | 'bus'
  travel_time_to_next_minutes?: number
}

export interface Itinerary {
  id: string
  title: string
  days: number
  items: ItineraryItem[]
}
