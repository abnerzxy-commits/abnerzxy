import type { MetadataRoute } from 'next'
import { spots, suggestedItineraries } from '@/lib/data'

const BASE_URL = 'https://korea-travel.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/spots`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/itinerary`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/souvenirs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tips`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const spotPages: MetadataRoute.Sitemap = spots.map(spot => ({
    url: `${BASE_URL}/spots/${spot.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const itineraryPages: MetadataRoute.Sitemap = suggestedItineraries.map(itin => ({
    url: `${BASE_URL}/itinerary/${itin.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...spotPages, ...itineraryPages]
}
