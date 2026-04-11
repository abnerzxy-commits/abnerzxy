import Link from 'next/link'
import Image from 'next/image'
import { spots, suggestedItineraries, typeLabels } from '@/lib/data'
import { getTypeColor, getTypeIcon } from '@/lib/utils'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import HomeSearch from '@/components/HomeSearch'

const highlights = [
  { id: 'a1', emoji: '🐠' },
  { id: 'p1', emoji: '🌸' },
  { id: 'r2', emoji: '🥩' },
  { id: 'a4', emoji: '🎢' },
  { id: 'a3', emoji: '🚃' },
  { id: 's1', emoji: '🛍' },
]
const featuredSpots = highlights.map(h => ({
  spot: spots.find(s => s.id === h.id),
  emoji: h.emoji,
})).filter(h => h.spot)

const dessertHighlight = spots
  .filter(s => s.type === 'dessert')
  .sort((a, b) => (b.review_count || 0) - (a.review_count || 0))
  .slice(0, 4)

const stats = [
  { label: '景點 / 公園', value: `${spots.filter(s => s.type === 'attraction' || s.type === 'park').length}`, icon: '🎡', color: 'from-blue-50 to-indigo-50 border-blue-100', accent: 'text-blue-600' },
  { label: '親子餐廳', value: `${spots.filter(s => s.type === 'restaurant').length}`, icon: '🍽', color: 'from-orange-50 to-amber-50 border-orange-100', accent: 'text-orange-600' },
  { label: '行程模板', value: `${suggestedItineraries.length}`, icon: '📅', color: 'from-emerald-50 to-green-50 border-emerald-100', accent: 'text-emerald-600' },
  { label: '均含訂位連結', value: `${spots.filter(s => s.reservation_links?.length).length}+`, icon: '🪑', color: 'from-rose-50 to-pink-50 border-rose-100', accent: 'text-rose-600' },
]

export default function HomePage() {
  return (
    <div>
      <BreadcrumbSchema items={[]} />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-900 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=1200&q=80"
          alt=""
          fill
          className="object-cover opacity-15"
          priority
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/50" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm mb-8 backdrop-blur-sm">
            <span aria-hidden="true">👶</span> 專為帶 2-6 歲小孩旅遊設計
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            帶孩子去<span className="text-yellow-300">釜山</span><br />
            什麼都幫你查好了
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            親子景點・公園遊樂場・無辣餐廳・訂位連結・網友優缺點<br />
            還有你的專屬 6 天行程
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/spots" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg shadow-yellow-400/30">
              🗺 探索所有景點餐廳
            </Link>
            <Link href="/itinerary" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all backdrop-blur-sm">
              📅 查看行程安排
            </Link>
          </div>

          {/* Search box */}
          <div className="mt-8 max-w-lg mx-auto">
            <HomeSearch />
          </div>
        </div>
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 51.7C120 43.3 240 26.7 360 21.7C480 16.7 600 23.3 720 28.3C840 33.3 960 36.7 1080 33.3C1200 30 1320 20 1380 15L1440 10V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100" aria-label="統計數據">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className={`text-center group bg-gradient-to-br ${s.color} rounded-2xl p-5 border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}>
              <div className="text-3xl mb-2" aria-hidden="true">{s.icon}</div>
              <div className={`text-3xl font-bold ${s.accent} transition-colors`}>{s.value}</div>
              <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kid-friendly highlights */}
      <section className="max-w-5xl mx-auto px-4 py-14" aria-labelledby="featured-heading">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="featured-heading" className="text-2xl md:text-3xl font-bold text-gray-900">精選親子景點</h2>
            <p className="text-gray-500 mt-1">全部以 2-6 歲小孩體驗為優先考量</p>
          </div>
          <Link href="/spots" className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredSpots.map(({ spot }) => spot && (
            <Link key={spot.id} href={`/spots/${spot.slug}`} className="group">
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44">
                  <Image src={spot.image_url} alt={spot.name_zh} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(spot.type)}`}>
                      {getTypeIcon(spot.type)} {typeLabels[spot.type]}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white font-bold text-base leading-tight">{spot.name_zh}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white/80 text-xs">{spot.district}</span>
                      <div className="flex" aria-label={`親子友善度 ${spot.kid_friendly_score} 星`}>
                        {Array.from({ length: spot.kid_friendly_score }).map((_, i) => (
                          <span key={i} className="text-xs" aria-hidden="true">👶</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {spot.ticket_price_free && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">免費</div>
                  )}
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-500 line-clamp-2">{spot.description}</p>
                  {spot.review_summary?.pros[0] && (
                    <p className="text-xs text-green-600 mt-2 flex gap-1">
                      <span aria-hidden="true">✓</span><span className="line-clamp-1">{spot.review_summary.pros[0]}</span>
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Dessert/snack highlights */}
      <section className="max-w-5xl mx-auto px-4 py-14" aria-labelledby="dessert-heading">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="dessert-heading" className="text-2xl md:text-3xl font-bold text-gray-900">社群爆紅甜點 / 小吃</h2>
            <p className="text-gray-500 mt-1">近半年話題，包含便利商店限定、IG 熱搜必吃</p>
          </div>
          <Link href="/spots?type=dessert" className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">查看全部甜點 →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dessertHighlight.map(spot => (
            <Link key={spot.id} href={`/spots/${spot.slug}`} className="group">
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44">
                  <Image src={spot.image_url} alt={spot.name_zh} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(spot.type)}`}>
                      {getTypeIcon(spot.type)} {typeLabels[spot.type]}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">{spot.name_zh}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{spot.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-yellow-600">⭐ {spot.rating}</span>
                    <span className="text-xs text-green-600">👍 {spot.review_count}+ 評論</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature blocks */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-14" aria-labelledby="features-heading">
        <div className="max-w-5xl mx-auto px-4">
          <h2 id="features-heading" className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">這個網站幫你整理了什麼？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🌶', title: '辣度標示', desc: '每個餐廳都標注辣度，無辣和可調整辣度的一目了然，小孩可以吃的安心', bg: 'bg-red-50', ring: 'ring-red-100' },
              { icon: '👶', title: '親子評分', desc: '每個景點都有 1-5 星親子友善評分，並說明 2-6 歲小孩的具體體驗', bg: 'bg-blue-50', ring: 'ring-blue-100' },
              { icon: '📝', title: '網友優缺點', desc: '整理真實旅遊者最常提到的優點和需要注意的缺點，非極端偏頗意見', bg: 'bg-amber-50', ring: 'ring-amber-100' },
              { icon: '🪑', title: '直接訂位', desc: '餐廳附上 Catch Table / KKday / 官網訂位連結，選好日期直接跳轉', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${f.bg} ring-1 ${f.ring} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-3xl" aria-hidden="true">{f.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary preview */}
      <section className="max-w-5xl mx-auto px-4 py-14" aria-labelledby="itinerary-heading">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="itinerary-heading" className="text-2xl md:text-3xl font-bold text-gray-900">行程模板</h2>
            <p className="text-gray-500 mt-1">個人行程 + 親子公園巡禮 + 一日精華</p>
          </div>
          <Link href="/itinerary" className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {suggestedItineraries.map(itin => (
            <Link key={itin.id} href={`/itinerary/${itin.id}`} className="group">
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-40">
                  <Image src={itin.image_url} alt={itin.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded-full font-medium">{itin.days} 天</span>
                    <p className="text-white font-bold mt-1.5">{itin.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">{itin.description}</p>
                  <p className="text-xs text-blue-600 mt-2 font-medium group-hover:translate-x-1 transition-transform inline-block">查看完整行程 →</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Free parks CTA */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-800 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">🌳</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">釜山有超多免費親子公園！</h2>
          <p className="text-emerald-100 mb-8 max-w-md mx-auto leading-relaxed">
            免費水樂園、遊樂設施、推車友善步道<br />不用花大錢就能讓小孩玩一整天
          </p>
          <Link href="/spots?type=park" className="inline-block bg-white text-emerald-700 font-bold px-8 py-4 rounded-2xl hover:bg-emerald-50 transition-all hover:scale-105 shadow-lg">
            查看所有親子公園 →
          </Link>
        </div>
      </section>

      {/* Souvenirs CTA */}
      <section className="bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">🎁</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">釜山必買伴手禮攻略</h2>
          <p className="text-pink-100 mb-8 max-w-md mx-auto leading-relaxed">
            美食名產、美妝保養、文創周邊<br />價格地點一次整理，不怕買錯買貴
          </p>
          <Link href="/souvenirs" className="inline-block bg-white text-pink-700 font-bold px-8 py-4 rounded-2xl hover:bg-pink-50 transition-all hover:scale-105 shadow-lg">
            查看伴手禮專區 →
          </Link>
        </div>
      </section>

      {/* Tips CTA */}
      <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">💱</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">換韓元＆旅遊須知</h2>
          <p className="text-amber-100 mb-8 max-w-md mx-auto leading-relaxed">
            匯率怎麼算？現金帶多少？<br />出發前看這頁就夠
          </p>
          <Link href="/tips" className="inline-block bg-white text-amber-700 font-bold px-8 py-4 rounded-2xl hover:bg-amber-50 transition-all hover:scale-105 shadow-lg">
            查看實用資訊 →
          </Link>
        </div>
      </section>
    </div>
  )
}
