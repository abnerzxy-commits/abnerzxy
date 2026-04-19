export default function SpotDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32 md:pb-8">
      {/* Back link */}
      <div className="h-5 w-28 bg-gray-200 rounded animate-shimmer mb-6" />

      {/* Hero image skeleton */}
      <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden bg-gray-200 mb-8 animate-shimmer">
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-6 w-20 bg-white/30 rounded-full mb-3" />
          <div className="h-9 w-64 bg-white/30 rounded-lg mb-2" />
          <div className="h-5 w-40 bg-white/20 rounded-lg" />
        </div>
      </div>

      {/* Mobile quick info strip */}
      <div className="lg:hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-100 rounded-lg animate-shimmer shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-16 bg-gray-100 rounded animate-shimmer" />
              <div className="h-4 w-48 bg-gray-200 rounded animate-shimmer" />
            </div>
          </div>
        ))}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          {[56, 48, 64].map((w, i) => (
            <div key={i} className="h-6 rounded-full bg-gray-100 animate-shimmer" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-200 rounded animate-shimmer" />
            <div className="h-5 w-full bg-gray-200 rounded animate-shimmer" />
            <div className="h-5 w-3/4 bg-gray-100 rounded animate-shimmer" />
          </div>

          {/* Kid-friendly badge */}
          <div className="rounded-2xl px-5 py-4 bg-green-50 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-48 bg-green-200/60 rounded animate-shimmer" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-green-200/60 rounded-full animate-shimmer" />
                ))}
              </div>
            </div>
            <div className="h-4 w-full bg-green-100/60 rounded animate-shimmer" />
          </div>

          {/* Review summary */}
          <div className="space-y-4">
            <div className="h-7 w-32 bg-gray-200 rounded animate-shimmer" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-2xl p-5 space-y-2">
                <div className="h-5 w-20 bg-green-200/60 rounded animate-shimmer" />
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-4 bg-green-100/60 rounded animate-shimmer" style={{ width: `${90 - i * 10}%` }} />
                ))}
              </div>
              <div className="bg-red-50 rounded-2xl p-5 space-y-2">
                <div className="h-5 w-20 bg-red-200/60 rounded animate-shimmer" />
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-4 bg-red-100/60 rounded animate-shimmer" style={{ width: `${90 - i * 10}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Menu skeleton */}
          <div className="space-y-4">
            <div className="h-7 w-40 bg-gray-200 rounded animate-shimmer" />
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-xl shrink-0 animate-shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-shimmer" />
                  <div className="h-3 w-24 bg-gray-100 rounded animate-shimmer" />
                  <div className="h-4 w-full bg-gray-100 rounded animate-shimmer" />
                  <div className="h-4 w-20 bg-green-100 rounded animate-shimmer" />
                </div>
              </div>
            ))}
          </div>

          {/* Map skeleton */}
          <div className="space-y-4">
            <div className="h-7 w-24 bg-gray-200 rounded animate-shimmer" />
            <div className="h-64 bg-gray-200 rounded-2xl animate-shimmer" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block space-y-6">
          {/* Info card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-100 rounded-lg animate-shimmer shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-16 bg-gray-100 rounded animate-shimmer" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-shimmer" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-11 bg-gray-100 rounded-xl animate-shimmer" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
