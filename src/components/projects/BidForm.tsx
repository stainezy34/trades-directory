import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Project } from '../../lib/types/project'

const bidSchema = z.object({
  amount: z.number()
    .positive('Bid amount must be greater than 0'),
  estimatedDuration: z.string()
    .min(1, 'Estimated duration is required'),
  proposal: z.string()
    .min(50, 'Proposal must be at least 50 characters')
    .max(1000, 'Proposal must be less than 1000 characters')
})

type BidFormData = z.infer<typeof bidSchema>

type Props = {
  project: Project
  onSubmit: (data: BidFormData) => Promise<void>
  isSubmitting?: boolean
}

export function BidForm({ project, onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BidFormData>({
    resolver: zodResolver(bidSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Bid Amount ($)</label>
        <input
          type="number"
          {...register('amount', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-lg border-gray-300"
          placeholder="0.00"
          min="0"
          step="0.01"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Proposal</label>
        <textarea
          {...register('proposal')}
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-300"
          placeholder="Describe your approach to this project..."
        />
        {errors.proposal && (
          <p className="mt-1 text-sm text-red-600">{errors.proposal.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Bid'}
        </button>
      </div>
    </form>
  )
}