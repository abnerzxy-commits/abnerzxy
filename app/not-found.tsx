import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="relative inline-block mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-6xl" aria-hidden="true">🗺</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-lg shadow-sm border-2 border-white">
          <span aria-hidden="true">?</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">迷路了！找不到這個頁面</h1>
      <p className="text-gray-500 mb-10 leading-relaxed">
        可能網址有誤，或這個頁面已經移除了<br />
        <span className="text-sm text-gray-400">不如去看看釜山的景點吧 :)</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/20 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          回首頁
        </Link>
        <Link
          href="/spots"
          className="bg-white text-gray-700 font-semibold px-8 py-3.5 rounded-2xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          探索景點
        </Link>
      </div>
    </div>
  )
}
