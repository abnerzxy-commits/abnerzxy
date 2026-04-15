export default function SpotsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header + view toggle */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="h-9 w-72 bg-gray-200 rounded-lg animate-shimmer" />
          <div className="h-5 w-52 bg-gray-100 rounded mt-2 animate-shimmer" />
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
          <div className="h-8 w-16 bg-blue-100 rounded-lg animate-shimmer" />
          <div className="h-8 w-16 bg-gray-50 rounded-lg animate-shimmer" />
        </div>
      </div>

      {/* Search bar + filter toggle */}
      <div className="flex gap-2 mb-4">
        <div className="h-12 flex-1 bg-gray-100 rounded-2xl animate-shimmer" />
        <div className="h-12 w-20 bg-gray-100 rounded-2xl animate-shimmer md:hidden" />
      </div>

      {/* Filter chips */}
      <div className="hidden md:flex flex-wrap gap-2 mb-5">
        {[72, 80, 88, 96, 72, 88, 80, 88].map((w, i) => (
          <div
            key={i}
            className="h-9 rounded-full animate-shimmer"
            style={{
              width: `${w}px`,
              background: i === 0 ? '#dbeafe' : '#f3f4f6',
              animationDelay: `${i * 60}ms`,
            }}
          />
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-card-enter"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="h-44 bg-gray-200 animate-shimmer" style={{ animationDelay: `${i * 80}ms` }} />
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-1.5">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-shimmer" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded animate-shimmer" />
                </div>
                <div className="h-6 w-14 bg-blue-50 rounded-lg animate-shimmer shrink-0" />
              </div>
              <div className="space-y-1.5">
                <div className="h-4 w-full bg-gray-100 rounded animate-shimmer" />
                <div className="h-4 w-2/3 bg-gray-50 rounded animate-shimmer" />
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="w-4 h-4 bg-gray-100 rounded-full animate-shimmer" />
                  ))}
                </div>
                <div className="h-6 w-12 bg-green-50 rounded-lg animate-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
