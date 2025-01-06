import { memo } from 'react'

export const TradeProfileSkeleton = memo(function TradeProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-8 animate-pulse">
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full" />
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="h-8 w-64 bg-gray-200 rounded" />
                <div className="h-6 w-48 bg-gray-200 rounded" />
              </div>
              <div className="h-8 w-20 bg-gray-200 rounded" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-6 w-32 bg-gray-200 rounded-full" />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 rounded" />
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2].map(section => (
          <div key={section} className="space-y-4 animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="space-y-4">
              {[1, 2, 3].map(item => (
                <div key={item} className="h-32 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})