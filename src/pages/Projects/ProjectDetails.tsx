import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../lib/hooks/useAuth'
import { useProject } from '../../lib/hooks/useProject'
import { useBidding } from '../../lib/hooks/useBidding'
import { ProjectHeader } from '../../components/projects/ProjectHeader'
import { BidList } from '../../components/projects/BidList'
import { BidModal } from '../../components/projects/BidModal'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { project, loading: projectLoading } = useProject(id!)
  const { submitBid, updateBidStatus, loading: bidLoading } = useBidding(id!)
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)

  if (projectLoading) return <LoadingSpinner />
  if (!project) return <div>Project not found</div>

  const isProjectOwner = project.clientId === user?.id

  const handleBidSubmit = async (data: any) => {
    const success = await submitBid({
      ...data,
      projectId: project.id,
      tradespersonId: user!.id
    })

    if (success) {
      setIsBidModalOpen(false)
    }
  }

  const handleAcceptBid = async (bidId: string) => {
    await updateBidStatus(bidId, 'accepted')
  }

  const handleRejectBid = async (bidId: string) => {
    await updateBidStatus(bidId, 'rejected')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectHeader
        project={project}
        onBid={() => setIsBidModalOpen(true)}
        canBid={!isProjectOwner && project.status === 'open'}
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Bids</h2>
        <BidList
          projectId={project.id}
          isProjectOwner={isProjectOwner}
          onAccept={handleAcceptBid}
          onReject={handleRejectBid}
        />
      </div>

      <BidModal
        project={project}
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        onSubmit={handleBidSubmit}
        isSubmitting={bidLoading}
      />
    </div>
  )
}