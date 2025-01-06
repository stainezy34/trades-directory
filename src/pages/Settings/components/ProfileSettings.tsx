import { memo } from 'react'
import { useProfile } from '../../../lib/hooks/useProfile'
import { useAuth } from '../../../lib/hooks/useAuth'
import { ProfileForm } from '../../../components/profile/ProfileForm'
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner'

export const ProfileSettings = memo(function ProfileSettings() {
  const { user } = useAuth()
  const { profile, loading, error } = useProfile(user!.id)

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>
  if (!profile) return null

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
      <ProfileForm
        profileId={user!.id}
        onSuccess={() => {}}
        onCancel={() => {}}
      />
    </div>
  )
})