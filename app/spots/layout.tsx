import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '景點餐廳 | 帶娃衝釜山',
  description: '釜山親子景點、無辣餐廳、公園遊樂場完整列表，含親子評分、辣度標示、訂位連結。',
}

export default function SpotsLayout({ children }: { children: React.ReactNode }) {
  return children
}
