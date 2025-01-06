import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../lib/hooks/useAuth'
import { useProject } from '../../../lib/hooks/useProject'
import { useBidding } from '../../../lib/hooks/useBidding'
import { ProjectHeader } from './components/ProjectHeader'
import { ProjectDetails } from './components/ProjectDetails'
import { BidSection } from './components/BidSection'
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner'
import { ErrorAlert } from '../../../components/shared/ErrorAlert'

export function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { project, loading: projectLoading, error: projectError } = useProject(id!)
  const { submitBid, updateBidStatus, loading: bidLoading } = useBidding(id!)
  const [bidError, setBidError] = useState<string | null>(null)

  if (projectLoading) return <LoadingSpinner />
  if (projectError) return <ErrorAlert message={projectError} />
  if (!project) return <ErrorAlert message="Project not found" />

  const isProjectOwner = project.clientId === user?.id

  const handleBidSubmit = async (data: any) => {
    setBidError(null)
    try {
      const success = await submitBid({
        ...data,
        projectId: project.id,
        tradespersonId: user!.id
      })
      if (!success) {
        setBidError('Failed to submit bid')
      }
      return success
    } catch (error) {
      setBidError(error instanceof Error ? error.message : 'Failed to submit bid')
      return false
    }
  }

  const handleBidAction = async (bidId: string, action: 'accept' | 'reject') => {
    setBidError(null)
    try {
      await updateBidStatus(bidId, action)
    } catch (error) {
      setBidError(error instanceof Error ? error.message : `Failed to ${action} bid`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectHeader project={project} />
      
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectDetails project={project} />
        </div>

        <div>
          <BidSection
            project={project}
            isOwner={isProjectOwner}
            onBidSubmit={handleBidSubmit}
            onBidAction={handleBidAction}
            loading={bidLoading}
            error={bidError}
          />
        </div>
      </div>
    </div>
  )
}