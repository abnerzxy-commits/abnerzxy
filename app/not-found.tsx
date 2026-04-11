import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-32 text-center" role="alert">
      <div className="text-6xl mb-6" aria-hidden="true">🗺</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">找不到這個頁面</h1>
      <p className="text-gray-500 mb-8">可能網址有誤，或這個頁面已經移除了</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          回首頁
        </Link>
        <Link
          href="/spots"
          className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          探索景點
        </Link>
      </div>
    </div>
  )
}
