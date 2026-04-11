'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-md mx-auto px-4 py-32 text-center" role="alert">
      <div className="text-6xl mb-6" aria-hidden="true">😵</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">出了點問題</h1>
      <p className="text-gray-500 mb-8">頁面載入時發生錯誤，請重試一次</p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        重新載入
      </button>
    </div>
  )
}
