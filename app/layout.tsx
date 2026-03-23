import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: '韓遊通 | 韓國旅遊攻略・景點餐廳行程一站搞定',
  description: '聚合YouTube、IG網紅推薦，提供韓國景點、餐廳菜單、點餐技巧與完整行程建議。首爾、釜山、濟州島全覆蓋。',
  keywords: '韓國旅遊, 首爾餐廳, 韓國景點, 行程規劃, 弘大美食, 明洞購物',
  openGraph: {
    title: '韓遊通 | 韓國旅遊攻略',
    description: '最完整的韓國旅遊資訊，含餐廳菜單、點餐技巧、行程規劃',
    locale: 'zh_TW',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-gray-400 text-sm py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
            <p className="text-white font-semibold text-base">🇰🇷 韓遊通</p>
            <p>聚合 YouTube・Instagram 網紅推薦，讓你的韓國旅行更輕鬆</p>
            <p className="text-xs text-gray-600 mt-4">資料來源：YouTube 旅遊影片・Naver Place・Google Places｜價格資訊僅供參考，以現場為準</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
