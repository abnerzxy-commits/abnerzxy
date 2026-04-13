'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="relative inline-block mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-red-50 to-orange-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-6xl" aria-hidden="true">😵</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">出了點問題</h1>
      <p className="text-gray-500 mb-10 leading-relaxed">
        頁面載入時發生錯誤，請重試一次<br />
        <span className="text-sm text-gray-400">如果問題持續發生，試試回到首頁</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={reset}
          className="bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/20 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          重新載入
        </button>
        <Link
          href="/"
          className="bg-white text-gray-700 font-semibold px-8 py-3.5 rounded-2xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          回首頁
        </Link>
      </div>
    </div>
  )
}
