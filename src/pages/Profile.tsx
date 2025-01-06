import { useParams } from 'react-router-dom'
import { useProfile } from '../lib/hooks/useProfile'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ReviewList } from '../components/reviews/ReviewList'
import { ProjectList } from '../components/projects/ProjectList'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { ErrorBoundary } from '../components/shared/ErrorBoundary'

export function Profile() {
  const { id } = useParams<{ id: string }>()
  const { profile, loading, error } = useProfile(id!)

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>
  if (!profile) return <div>Profile not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorBoundary>
        <ProfileHeader profile={profile} />
        
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <ReviewList tradesPersonId={profile.id} />
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
            <ProjectList tradesPersonId={profile.id} />
          </section>
        </div>
      </ErrorBoundary>
    </div>
  )
}