import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Profile } from '../../../lib/types/profile'

const contactInfoSchema = z.object({
  location: z.string().min(2, 'Location is required'),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  social_links: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    facebook: z.string().url().optional()
  }).optional()
})

type ContactInfoData = z.infer<typeof contactInfoSchema>

type Props = {
  initialData: Profile
  onSubmit: (data: ContactInfoData) => void
  onBack: () => void
  submitting: boolean
}

export function ContactInfoForm({ initialData, onSubmit, onBack, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactInfoData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      location: initialData.location,
      phone: initialData.phone || '',
      website: initialData.website || '',
      social_links: initialData.social_links || {}
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          {...register('location')}
          className="mt-1 block w-full rounded-lg border-gray-300"
          placeholder="City, State"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded-lg border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Website (Optional)
        </label>
        <input
          type="url"
          {...register('website')}
          className="mt-1 block w-full rounded-lg border-gray-300"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Social Links (Optional)</h4>
        
        <div>
          <label className="block text-sm text-gray-600">LinkedIn</label>
          <input
            type="url"
            {...register('social_links.linkedin')}
            className="mt-1 block w-full rounded-lg border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Twitter</label>
          <input
            type="url"
            {...register('social_links.twitter')}
            className="mt-1 block w-full rounded-lg border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Facebook</label>
          <input
            type="url"
            {...register('social_links.facebook')}
            className="mt-1 block w-full rounded-lg border-gray-300"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  )
}