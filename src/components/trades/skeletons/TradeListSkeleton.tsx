import { memo } from 'react'
import { TradeCardSkeleton } from './TradeCardSkeleton'

type Props = {
  count?: number
}

export const TradeListSkeleton = memo(function TradeListSkeleton({ count = 3 }: Props) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <TradeCardSkeleton key={i} />
      ))}
    </div>
  )
})