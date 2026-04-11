export default function ItineraryLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <div className="h-10 w-48 bg-gray-200 rounded-lg animate-shimmer mx-auto" />
        <div className="h-5 w-80 bg-gray-100 rounded mt-3 animate-shimmer mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-56 bg-gray-200 animate-shimmer" />
            <div className="p-5 space-y-3">
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-shimmer" />
              <div className="h-4 w-full bg-gray-100 rounded animate-shimmer" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-10 w-full bg-gray-50 rounded-xl animate-shimmer" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
