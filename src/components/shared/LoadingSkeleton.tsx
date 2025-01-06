import { memo } from 'react'
import { cn } from '../../lib/utils/cn'

type Props = {
  className?: string
  count?: number
}

export const LoadingSkeleton = memo(function LoadingSkeleton({ 
  className, 
  count = 1 
}: Props) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse bg-gray-200 rounded-lg",
            className
          )}
        />
      ))}
    </div>
  )
})