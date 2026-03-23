import Link from 'next/link'
import Image from 'next/image'
import { spots, suggestedItineraries } from '@/lib/data'
import SpotCard from '@/components/SpotCard'

const featuredSpotIds = ['6', '7', '1', '3', '9', '12']
const featuredSpots = featuredSpotIds.map(id => spots.find(s => s.id === id)).filter(Boolean)

const stats = [
  { label: '熱門景點', value: `${spots.filter(s => s.type === 'attraction' || s.type === 'activity').length}+` },
  { label: '餐廳咖啡廳', value: `${spots.filter(s => s.type === 'restaurant' || s.type === 'cafe').length}+` },
  { label: '行程模板', value: `${suggestedItineraries.length}` },
  { label: '點餐攻略', value: `${spots.filter(s => s.recommended_dishes?.length).length}+` },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=1400&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            <span>✨</span>
            <span>聚合 YouTube・Instagram 網紅推薦</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            韓國旅遊，<br />
            <span className="text-yellow-300">一站搞定</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            景點・餐廳・點餐技巧・行程規劃<br />
            從首爾到釜山，把網紅推薦整理給你
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/spots"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg"
            >
              🗺 探索景點餐廳
            </Link>
            <Link
              href="/itinerary"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all"
            >
              📅 看行程模板
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Spots */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">精選景點與餐廳</h2>
            <p className="text-gray-500 mt-1">YouTube 旅遊頻道最多人推薦</p>
          </div>
          <Link href="/spots" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSpots.map(spot => spot && <SpotCard key={spot.id} spot={spot} />)}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            為什麼選韓遊通？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '📺', title: 'YouTube 網紅認證', desc: '每個景點都標注哪位 YouTuber 推薦，搭配原始影片連結，讓你先看影片再決定去不去。' },
              { icon: '🍽', title: '點餐攻略超詳細', desc: '不只告訴你去哪吃，還告訴你「要點什麼菜、怎麼說韓文、要不要排隊」，完全解決語言障礙。' },
              { icon: '📅', title: '行程安排超實際', desc: '自動計算交通時間、提醒你哪天公休、每個景點建議停留多久，讓你不過度安排、行程不爆炸。' },
            ].map(f => (
              <div key={f.title} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary Preview */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">行程模板</h2>
            <p className="text-gray-500 mt-1">直接套用，出發前5分鐘搞定行程</p>
          </div>
          <Link href="/itinerary" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestedItineraries.map(itin => (
            <Link key={itin.id} href={`/itinerary/${itin.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex">
                <div className="relative w-36 shrink-0">
                  <Image src={itin.image_url} alt={itin.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="144px" />
                </div>
                <div className="p-5 flex-1">
                  <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-1 rounded-full">{itin.days} 天行程</span>
                  <h3 className="font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">{itin.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{itin.description}</p>
                  <p className="text-xs text-gray-400 mt-3">包含 {itin.spotIds.length} 個景點・餐廳</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* City Quick Links */}
      <section className="bg-blue-900 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">選擇你的目的地</h2>
          <p className="text-blue-200 mb-8">首爾・釜山・濟州，韓國熱門城市全覆蓋</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { city: '首爾', emoji: '🏙️', desc: '弘大・明洞・景福宮' },
              { city: '釜山', emoji: '🌊', desc: '海雲台・甘川文化村' },
              { city: '濟州', emoji: '🍊', desc: '漢拏山・城山日出峰' },
            ].map(c => (
              <Link key={c.city} href={`/spots?city=${c.city}`} className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-8 py-5 text-center transition-all hover:scale-105 min-w-[160px]">
                <div className="text-4xl mb-2">{c.emoji}</div>
                <div className="font-bold text-lg">{c.city}</div>
                <div className="text-xs text-blue-200 mt-1">{c.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
