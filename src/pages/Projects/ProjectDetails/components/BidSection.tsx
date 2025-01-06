import { memo, useState } from 'react'
import { BidList } from '../../../../components/projects/BidList'
import { BidModal } from '../../../../components/projects/BidModal'
import { ErrorAlert } from '../../../../components/shared/ErrorAlert'
import type { Project } from '../../../../lib/types/project'

type Props = {
  project: Project
  isOwner: boolean
  onBidSubmit: (data: any) => Promise<boolean>
  onBidAction: (bidId: string, action: 'accept' | 'reject') => Promise<void>
  loading?: boolean
  error?: string | null
}

export const BidSection = memo(function BidSection({
  project,
  isOwner,
  onBidSubmit,
  onBidAction,
  loading,
  error
}: Props) {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)

  const canBid = !isOwner && project.status === 'open'

  return (
    <div className="space-y-4">
      {canBid && (
        <button
          onClick={() => setIsBidModalOpen(true)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition-colors"
        >
          Submit Bid
        </button>
      )}

      {error && <ErrorAlert message={error} />}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Bids</h2>
        <BidList
          projectId={project.id}
          isProjectOwner={isOwner}
          onAccept={(bidId) => onBidAction(bidId, 'accept')}
          onReject={(bidId) => onBidAction(bidId, 'reject')}
        />
      </div>

      <BidModal
        project={project}
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        onSubmit={async (data) => {
          const success = await onBidSubmit(data)
          if (success) {
            setIsBidModalOpen(false)
          }
        }}
        isSubmitting={loading}
      />
    </div>
  )
})