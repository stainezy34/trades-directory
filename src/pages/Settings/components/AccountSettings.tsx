import { memo, useState } from 'react'
import { useAuth } from '../../../lib/hooks/useAuth'
import { useValidatedForm } from '../../../lib/hooks/useValidatedForm'
import { passwordSchema } from '../../../lib/validations'
import { FormField } from '../../../components/shared/FormField'
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner'

export const AccountSettings = memo(function AccountSettings() {
  const { user, updatePassword } = useAuth()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useValidatedForm(passwordSchema)

  const onSubmit = async (data: any) => {
    try {
      setError(null)
      setSuccess(false)
      await updatePassword(data.currentPassword, data.newPassword)
      setSuccess(true)
      reset()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update password')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Email Address</h3>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Current Password"
              error={errors.currentPassword?.message}
            >
              <input
                type="password"
                {...register('currentPassword')}
                className="w-full rounded-lg border-gray-300"
              />
            </FormField>

            <FormField
              label="New Password"
              error={errors.newPassword?.message}
            >
              <input
                type="password"
                {...register('newPassword')}
                className="w-full rounded-lg border-gray-300"
              />
            </FormField>

            <FormField
              label="Confirm New Password"
              error={errors.confirmPassword?.message}
            >
              <input
                type="password"
                {...register('confirmPassword')}
                className="w-full rounded-lg border-gray-300"
              />
            </FormField>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 text-green-700 rounded-lg">
                Password updated successfully
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <LoadingSpinner /> : 'Update Password'}
            </button>
          </form>
        </div>

        <div>
          <h3 className="font-medium text-red-600 mb-4">Danger Zone</h3>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                // Handle account deletion
              }
            }}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg
                     hover:bg-red-50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
})