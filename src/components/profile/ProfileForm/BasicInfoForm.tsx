import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Profile } from '../../../lib/types/profile'

const basicInfoSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  business_name: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  avatar_url: z.string().url().optional()
})

type BasicInfoData = z.infer<typeof basicInfoSchema>

type Props = {
  initialData: Profile
  onSubmit: (data: BasicInfoData) => void
  onCancel: () => void
  submitting: boolean
}

export function BasicInfoForm({ initialData, onSubmit, onCancel, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      full_name: initialData.full_name,
      business_name: initialData.business_name || '',
      bio: initialData.bio || '',
      avatar_url: initialData.avatar_url || ''
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          {...register('full_name')}
          className="mt-1 block w-full rounded-lg border-gray-300"
        />
        {errors.full_name && (
          <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Name (Optional)
        </label>
        <input
          type="text"
          {...register('business_name')}
          className="mt-1 block w-full rounded-lg border-gray-300"
        />
        {errors.business_name && (
          <p className="mt-1 text-sm text-red-600">{errors.business_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          {...register('bio')}
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-300"
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Profile Picture URL
        </label>
        <input
          type="url"
          {...register('avatar_url')}
          className="mt-1 block w-full rounded-lg border-gray-300"
        />
        {errors.avatar_url && (
          <p className="mt-1 text-sm text-red-600">{errors.avatar_url.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : 'Next'}
        </button>
      </div>
    </form>
  )
}