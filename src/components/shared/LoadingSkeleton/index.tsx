import { cn } from '../../../lib/utils/cn'
import { SkeletonItem } from './SkeletonItem'
import { SkeletonContainer } from './SkeletonContainer'
import type { SkeletonVariant } from './types'

type Props = {
  className?: string
  count?: number
  variant?: SkeletonVariant
}

export function LoadingSkeleton({ className, count = 1, variant = 'default' }: Props) {
  return (
    <SkeletonContainer>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem
          key={i}
          variant={variant}
          className={cn(
            "animate-pulse bg-gray-200 rounded-lg",
            className
          )}
        />
      ))}
    </SkeletonContainer>
  )
}

// Export sub-components for direct usage
LoadingSkeleton.Item = SkeletonItem
LoadingSkeleton.Container = SkeletonContainer