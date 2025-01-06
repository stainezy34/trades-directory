import { memo } from 'react'

export const TradeCertificationSkeleton = memo(function TradeCertificationSkeleton() {
  return (
    <div className="bg-white rounded-lg border p-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-5 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-5 w-20 bg-gray-200 rounded" />
          <div className="w-4 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
})