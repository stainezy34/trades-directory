import { useParams } from 'react-router-dom'
import { useProfile } from '../../lib/hooks/useProfile'
import { ProfileHeader } from './components/ProfileHeader'
import { ProfileContent } from './components/ProfileContent'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'
import { ErrorBoundary } from '../../components/shared/ErrorBoundary'

export function ProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { profile, loading, error } = useProfile(id!)

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>
  if (!profile) return <div>Profile not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorBoundary>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </ErrorBoundary>
    </div>
  )
}