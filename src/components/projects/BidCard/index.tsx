import { BidHeader } from './BidHeader'
import { BidDetails } from './BidDetails'
import { BidActions } from './BidActions'
import type { Bid } from '../../../lib/types/bid'

type Props = {
  bid: Bid
  isProjectOwner: boolean
  onAccept?: (bidId: string) => Promise<void>
  onReject?: (bidId: string) => Promise<void>
}

export function BidCard({ bid, isProjectOwner, onAccept, onReject }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <BidHeader
        tradesperson={bid.tradesperson}
        status={bid.status}
        date={bid.createdAt}
      />
      
      <BidDetails
        amount={bid.amount}
        estimatedDuration={bid.estimatedDuration}
        proposal={bid.proposal}
      />

      {isProjectOwner && bid.status === 'pending' && (
        <BidActions
          bidId={bid.id}
          onAccept={onAccept}
          onReject={onReject}
        />
      )}
    </div>
  )
}