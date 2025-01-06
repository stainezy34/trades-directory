import { memo } from 'react'
import { BidCard } from '../BidCard'
import { useBids } from '../../../lib/hooks/useBids'
import { LoadingSpinner } from '../../shared/LoadingSpinner'
import type { Bid } from '../../../lib/types/bid'

type Props = {
  projectId: string
  isProjectOwner: boolean
  onAccept?: (bidId: string) => Promise<void>
  onReject?: (bidId: string) => Promise<void>
}

export const BidList = memo(function BidList({ 
  projectId, 
  isProjectOwner,
  onAccept,
  onReject
}: Props) {
  const { bids, loading, error } = useBids({ projectId })

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      {bids.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No bids yet</p>
      ) : (
        bids.map((bid: Bid) => (
          <BidCard
            key={bid.id}
            bid={bid}
            isProjectOwner={isProjectOwner}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))
      )}
    </div>
  )
})