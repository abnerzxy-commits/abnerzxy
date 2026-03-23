import Link from 'next/link'
import Image from 'next/image'
import { suggestedItineraries, spots } from '@/lib/data'

export default function ItineraryListPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">行程模板</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          精心規劃的韓國行程，含時間安排、票價、交通建議，直接套用出發
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {suggestedItineraries.map(itin => {
          const itinSpots = itin.spotIds.map(id => spots.find(s => s.id === id)).filter(Boolean)
          const cities = [...new Set(itinSpots.map(s => s?.city).filter(Boolean))]
          const totalItems = itin.schedule.reduce((acc, day) => acc + day.items.length, 0)

          return (
            <Link key={itin.id} href={`/itinerary/${itin.id}`} className="group">
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="relative h-56">
                  <Image src={itin.image_url} alt={itin.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                      {itin.days} 天行程
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-1">{itin.title}</h2>
                    <p className="text-white/80 text-sm">{itin.description}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>📍 {cities.join('・')}</span>
                    <span>🗺 {totalItems} 個地點</span>
                  </div>
                  {/* Day summary */}
                  <div className="space-y-2">
                    {itin.schedule.map(day => (
                      <div key={day.day} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg shrink-0">
                          D{day.day}
                        </span>
                        <span className="text-sm text-gray-700 font-medium">{day.title}</span>
                        <span className="text-xs text-gray-400 ml-auto">{day.items.length} 個地點</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {itinSpots.slice(0, 4).map(s => s && (
                        <div key={s.id} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                          <Image src={s.image_url} alt={s.name_zh} fill className="object-cover" sizes="32px" />
                        </div>
                      ))}
                    </div>
                    <span className="text-blue-600 font-semibold text-sm group-hover:underline">
                      查看完整行程 →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Custom itinerary CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-center text-white">
        <div className="text-4xl mb-3">✏️</div>
        <h2 className="text-2xl font-bold mb-2">想要客製化行程？</h2>
        <p className="text-blue-100 mb-6 max-w-md mx-auto">
          前往景點頁面，選好你想去的地方，根據模板自行調整，打造專屬的韓國行程
        </p>
        <Link href="/spots" className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
          瀏覽景點餐廳
        </Link>
      </div>
    </div>
  )
}
