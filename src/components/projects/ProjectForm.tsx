import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TRADE_TYPES } from '../../lib/utils/filters'
import type { Project } from '../../lib/types/project'

const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  tradeType: z.enum(TRADE_TYPES),
  location: z.string().min(3, 'Location is required'),
  budget: z.number().positive('Budget must be greater than 0'),
  deadline: z.string().refine(date => new Date(date) > new Date(), {
    message: 'Deadline must be in the future'
  }),
  estimatedDuration: z.string().min(1, 'Estimated duration is required')
})

type ProjectFormData = z.infer<typeof projectSchema>

type Props = {
  onSubmit: (data: ProjectFormData) => Promise<void>
  initialData?: Partial<Project>
  isSubmitting?: boolean
}

export function ProjectForm({ onSubmit, initialData, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-lg border-gray-300"
          placeholder="e.g., Kitchen Renovation"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-300"
          placeholder="Describe your project in detail..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Trade Type</label>
          <select
            {...register('tradeType')}
            className="mt-1 block w-full rounded-lg border-gray-300"
          >
            <option value="">Select a trade...</option>
            {TRADE_TYPES.map(trade => (
              <option key={trade} value={trade}>{trade}</option>
            ))}
          </select>
          {errors.tradeType && (
            <p className="mt-1 text-sm text-red-600">{errors.tradeType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            {...register('location')}
            className="mt-1 block w-full rounded-lg border-gray-300"
            placeholder="e.g., New York, NY"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
          <input
            type="number"
            {...register('budget', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-lg border-gray-300"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            {...register('deadline')}
            className="mt-1 block w-full rounded-lg border-gray-300"
          />
          {errors.deadline && (
            <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estimated Duration
          </label>
          <input
            type="text"
            {...register('estimatedDuration')}
            className="mt-1 block w-full rounded-lg border-gray-300"
            placeholder="e.g., 2 weeks"
          />
          {errors.estimatedDuration && (
            <p className="mt-1 text-sm text-red-600">{errors.estimatedDuration.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}