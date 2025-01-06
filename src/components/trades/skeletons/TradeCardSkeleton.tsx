import { memo } from 'react'

export const TradeCardSkeleton = memo(function TradeCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-24 h-24 bg-gray-200 rounded-full" />
        
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-16 bg-gray-200 rounded" />
          </div>

          {/* Trade badges */}
          <div className="mt-4 flex gap-2">
            {[1, 2].map(i => (
              <div key={i} className="h-6 w-24 bg-gray-200 rounded-full" />
            ))}
          </div>

          {/* Info grid */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
            <div className="w-24 h-10 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
})