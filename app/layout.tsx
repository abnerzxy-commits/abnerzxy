import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import BottomNav from '@/components/BottomNav'
import BackToTop from '@/components/BackToTop'
import AddToHomeScreen from '@/components/AddToHomeScreen'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-tc',
})

const SITE_URL = 'https://korea-travel.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '帶娃衝釜山 | 釜山親子旅遊攻略・景點餐廳行程一站搞定',
  description: '帶娃衝釜山聚合YouTube、IG網紅推薦，精選釜山親子景點、無辣餐廳、公園遊樂場，提供菜單翻譯、點餐韓文、訂位連結與6天行程規劃。',
  keywords: '釜山親子旅遊, 釜山景點, 釜山餐廳, 帶小孩去釜山, 釜山無辣餐廳, 海雲台親子, 釜山行程規劃, 韓國親子遊',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: '帶娃衝釜山 | 釜山親子旅遊攻略',
    description: '精選釜山親子景點・無辣餐廳・公園遊樂場，含訂位連結與6天行程規劃',
    locale: 'zh_TW',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: '帶娃衝釜山 | 釜山親子旅遊攻略',
    description: '精選釜山親子景點・無辣餐廳・公園遊樂場，含訂位連結與6天行程規劃',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`h-full ${notoSansTC.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="帶娃衝釜山" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`min-h-full flex flex-col bg-gray-50 ${notoSansTC.className}`}>
        {/* Skip to content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-blue-600 focus:font-semibold">
          跳到主要內容
        </a>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2JFTSLLGJ5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-2JFTSLLGJ5")`}
        </Script>
        <Script id="sw-register" strategy="afterInteractive">
          {`if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`}
        </Script>
        <Navbar />
        <main id="main-content" className="flex-1 pb-16 md:pb-0" role="main">{children}</main>
        <BottomNav />
        <BackToTop />
        <AddToHomeScreen />
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400 text-sm py-10 pb-20 md:pb-10 mt-16 border-t border-gray-800/50" role="contentinfo">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
            <p className="text-white font-bold text-lg tracking-wide">🇰🇷 帶娃衝釜山</p>
            <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
              聚合 YouTube・Instagram 網紅推薦<br />
              讓你的韓國親子旅行更輕鬆
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <Link href="/spots" className="text-gray-500 hover:text-white transition-colors text-xs">景點餐廳</Link>
              <Link href="/itinerary" className="text-gray-500 hover:text-white transition-colors text-xs">行程規劃</Link>
              <Link href="/souvenirs" className="text-gray-500 hover:text-white transition-colors text-xs">伴手禮</Link>
              <Link href="/tips" className="text-gray-500 hover:text-white transition-colors text-xs">實用資訊</Link>
            </div>
            <div className="border-t border-gray-800 pt-4 mt-4">
              <p className="text-xs text-gray-600">
                資料來源：YouTube 旅遊影片・Naver Place・Google Places｜價格資訊僅供參考，以現場為準
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
