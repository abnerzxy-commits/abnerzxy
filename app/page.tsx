import Link from 'next/link'
import Image from 'next/image'
import { spots, suggestedItineraries, typeLabels } from '@/lib/data'
import { getTypeColor, getTypeIcon } from '@/lib/utils'

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
  { label: '景點 / 公園', value: `${spots.filter(s => s.type === 'attraction' || s.type === 'park').length}` },
  { label: '親子餐廳', value: `${spots.filter(s => s.type === 'restaurant').length}` },
  { label: '行程模板', value: `${suggestedItineraries.length}` },
  { label: '均含訂位連結', value: `${spots.filter(s => s.reservation_links?.length).length}+` },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-800 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=1400&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            👶 專為帶 2-6 歲小孩旅遊設計
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            帶孩子去<span className="text-yellow-300">釜山</span><br />
            什麼都幫你查好了
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            親子景點・公園遊樂場・無辣餐廳・訂位連結・網友優缺點<br />
            還有你的專屬 6 天行程
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/spots" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg">
              🗺 探索所有景點餐廳
            </Link>
            <Link href="/itinerary" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all">
              📅 查看行程安排
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kid-friendly highlights */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">精選親子景點</h2>
            <p className="text-gray-500 mt-1">全部以 2-6 歲小孩體驗為優先考量</p>
          </div>
          <Link href="/spots" className="text-blue-600 hover:text-blue-700 font-medium text-sm">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredSpots.map(({ spot }) => spot && (
            <Link key={spot.id} href={`/spots/${spot.slug}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="relative h-44">
                  <Image src={spot.image_url} alt={spot.name_zh} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="380px" />
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
                      <div className="flex">
                        {Array.from({ length: spot.kid_friendly_score }).map((_, i) => (
                          <span key={i} className="text-xs">👶</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {spot.ticket_price_free && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">免費</div>
                  )}
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-500 line-clamp-2">{spot.description}</p>
                  {spot.review_summary?.pros[0] && (
                    <p className="text-xs text-green-600 mt-2 flex gap-1">
                      <span>✓</span><span className="line-clamp-1">{spot.review_summary.pros[0]}</span>
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dessert/snack highlights */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">社群爆紅甜點 / 小吃</h2>
            <p className="text-gray-500 mt-1">近半年話題，包含便利商店限定、IG 熱搜必吃</p>
          </div>
          <Link href="/spots?type=dessert" className="text-blue-600 hover:text-blue-700 font-medium text-sm">查看全部甜點 →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dessertHighlight.map(spot => (
            <Link key={spot.id} href={`/spots/${spot.slug}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="relative h-44">
                  <Image src={spot.image_url} alt={spot.name_zh} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="380px" />
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
                    <span className="text-xs text-yellow-600">⭐⭐ {spot.rating}</span>
                    <span className="text-xs text-green-600">👍 {spot.review_count}+ 評論</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature blocks */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">這個網站幫你整理了什麼？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🌶', title: '辣度標示', desc: '每個餐廳都標注辣度，無辣和可調整辣度的一目了然，小孩可以吃的安心' },
              { icon: '👶', title: '親子評分', desc: '每個景點都有 1-5 星親子友善評分，並說明 2-6 歲小孩的具體體驗' },
              { icon: '📝', title: '網友優缺點', desc: '整理真實旅遊者最常提到的優點和需要注意的缺點，非極端偏頗意見' },
              { icon: '🪑', title: '直接訂位', desc: '餐廳附上 Catch Table / KKday / 官網訂位連結，選好日期直接跳轉' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary preview */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">行程模板</h2>
            <p className="text-gray-500 mt-1">個人行程 + 親子公園巡禮 + 一日精華</p>
          </div>
          <Link href="/itinerary" className="text-blue-600 hover:text-blue-700 font-medium text-sm">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {suggestedItineraries.map(itin => (
            <Link key={itin.id} href={`/itinerary/${itin.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="relative h-40">
                  <Image src={itin.image_url} alt={itin.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="380px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">{itin.days} 天</span>
                    <p className="text-white font-bold mt-1">{itin.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">{itin.description}</p>
                  <p className="text-xs text-blue-600 mt-2 font-medium">查看完整行程 →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Free parks CTA */}
      <section className="bg-emerald-700 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">🌳</div>
          <h2 className="text-2xl font-bold mb-2">釜山有超多免費親子公園！</h2>
          <p className="text-emerald-100 mb-6 max-w-md mx-auto">
            免費水樂園、遊樂設施、推車友善步道，<br />不用花大錢就能讓小孩玩一整天
          </p>
          <Link href="/spots?type=park" className="inline-block bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
            查看所有親子公園 →
          </Link>
        </div>
      </section>

      {/* Tips CTA */}
      <section className="bg-gradient-to-br from-amber-600 to-orange-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">💱</div>
          <h2 className="text-2xl font-bold mb-2">換韓元、伴手禮、旅遊須知</h2>
          <p className="text-amber-100 mb-6 max-w-md mx-auto">
            匯率怎麼算？現金帶多少？必買伴手禮？<br />出發前看這頁就夠
          </p>
          <Link href="/tips" className="inline-block bg-white text-amber-700 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors">
            查看實用資訊 →
          </Link>
        </div>
      </section>
    </div>
  )
}
