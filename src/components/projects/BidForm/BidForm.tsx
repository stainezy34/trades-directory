import { memo } from 'react'
import { useValidatedForm } from '../../../lib/hooks/useValidatedForm'
import { bidSchema } from '../../../lib/validations'
import { FormField } from '../../shared/FormField'
import { LoadingSpinner } from '../../shared/LoadingSpinner'
import type { BidInput } from '../../../lib/validations/bid'

type Props = {
  projectId: string
  onSubmit: (data: BidInput) => Promise<void>
  isSubmitting?: boolean
  onCancel?: () => void
}

export const BidForm = memo(function BidForm({
  projectId,
  onSubmit,
  isSubmitting,
  onCancel
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useValidatedForm(bidSchema)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Bid Amount ($)"
        error={errors.amount?.message}
      >
        <input
          type="number"
          {...register('amount', { valueAsNumber: true })}
          placeholder="0.00"
          min="0"
          step="0.01"
          className="w-full rounded-lg border-gray-300"
        />
      </FormField>

      <FormField
        label="Estimated Duration"
        error={errors.estimatedDuration?.message}
      >
        <input
          type="text"
          {...register('estimatedDuration')}
          placeholder="e.g., 2 weeks"
          className="w-full rounded-lg border-gray-300"
        />
      </FormField>

      <FormField
        label="Proposal"
        error={errors.proposal?.message}
      >
        <textarea
          {...register('proposal')}
          rows={4}
          placeholder="Describe your approach to this project..."
          className="w-full rounded-lg border-gray-300"
        />
      </FormField>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <LoadingSpinner />
          ) : (
            'Submit Bid'
          )}
        </button>
      </div>
    </form>
  )
})