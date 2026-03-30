import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '帶娃衝釜山 | 釜山親子旅遊攻略',
    short_name: '帶娃衝釜山',
    description: '精選釜山親子景點・無辣餐廳・公園遊樂場，含訂位連結與6天行程規劃',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#1d4ed8',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
