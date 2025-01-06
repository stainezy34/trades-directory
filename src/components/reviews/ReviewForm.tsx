import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Star, Upload, X } from 'lucide-react'
import { useReviews } from '../../lib/hooks/useReviews'
import type { Database } from '../../lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  project_date: z.string().nonempty('Project date is required'),
  project_description: z.string()
    .min(10, 'Project description must be at least 10 characters')
    .max(500, 'Project description must be less than 500 characters'),
  comment: z.string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review must be less than 1000 characters'),
})

type ReviewFormData = z.infer<typeof reviewSchema>

type Props = {
  tradesperson: Profile
  onSuccess: () => void
  onCancel: () => void
}

export function ReviewForm({ tradesperson, onSuccess, onCancel }: Props) {
  const [hoveredStar, setHoveredStar] = useState(0)
  const { submitReview, submitting, error } = useReviews()
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    }
  })

  const rating = watch('rating')

  const onSubmit = async (data: ReviewFormData) => {
    const success = await submitReview({
      ...data,
      reviewer_id: 'current-user-id', // This should come from auth context
      tradesperson_id: tradesperson.id,
      images: [] // Image handling would be implemented separately
    })

    if (success) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue('rating', star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredStar || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Date
        </label>
        <input
          type="date"
          {...register('project_date')}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.project_date && (
          <p className="mt-1 text-sm text-red-600">{errors.project_date.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Description
        </label>
        <textarea
          {...register('project_description')}
          rows={3}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe the project they worked on..."
        />
        {errors.project_description && (
          <p className="mt-1 text-sm text-red-600">{errors.project_description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          {...register('comment')}
          rows={4}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Share your experience working with this tradesperson..."
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

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
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  )
}