import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-tc',
})

export const metadata: Metadata = {
  title: '帶娃衝釜山 | 釜山親子旅遊攻略・景點餐廳行程一站搞定',
  description: '帶娃衝釜山聚合YouTube、IG網紅推薦，精選釜山親子景點、無辣餐廳、公園遊樂場，提供菜單翻譯、點餐韓文、訂位連結與6天行程規劃。',
  keywords: '釜山親子旅遊, 釜山景點, 釜山餐廳, 帶小孩去釜山, 釜山無辣餐廳, 海雲台親子, 釜山行程規劃, 韓國親子遊',
  openGraph: {
    title: '帶娃衝釜山 | 釜山親子旅遊攻略',
    description: '精選釜山親子景點・無辣餐廳・公園遊樂場，含訂位連結與6天行程規劃',
    locale: 'zh_TW',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`h-full ${notoSansTC.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2JFTSLLGJ5" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-2JFTSLLGJ5")` }} />
      </head>
      <body className={`min-h-full flex flex-col bg-gray-50 ${notoSansTC.className}`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-gray-400 text-sm py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
            <p className="text-white font-semibold text-base">🇰🇷 帶娃衝釜山</p>
            <p>聚合 YouTube・Instagram 網紅推薦，讓你的韓國親子旅行更輕鬆</p>
            <p className="text-xs text-gray-600 mt-4">資料來源：YouTube 旅遊影片・Naver Place・Google Places｜價格資訊僅供參考，以現場為準</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
