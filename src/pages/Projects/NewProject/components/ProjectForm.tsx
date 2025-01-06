import { memo } from 'react'
import { useValidatedForm } from '../../../../lib/hooks/useValidatedForm'
import { projectSchema } from '../../../../lib/validations'
import { TRADE_TYPES } from '../../../../lib/utils/filters'
import { FormField } from '../../../../components/shared/FormField'
import { LoadingSpinner } from '../../../../components/shared/LoadingSpinner'
import type { ProjectFormData } from '../types'

type Props = {
  onSubmit: (data: ProjectFormData) => Promise<void>
  isSubmitting?: boolean
}

export const ProjectForm = memo(function ProjectForm({ onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useValidatedForm(projectSchema)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Title"
        error={errors.title?.message}
      >
        <input
          type="text"
          {...register('title')}
          placeholder="e.g., Kitchen Renovation"
          className="w-full rounded-lg border-gray-300"
        />
      </FormField>

      <FormField
        label="Description"
        error={errors.description?.message}
      >
        <textarea
          {...register('description')}
          rows={4}
          placeholder="Describe your project in detail..."
          className="w-full rounded-lg border-gray-300"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Trade Type"
          error={errors.tradeType?.message}
        >
          <select
            {...register('tradeType')}
            className="w-full rounded-lg border-gray-300"
          >
            <option value="">Select a trade...</option>
            {TRADE_TYPES.map(trade => (
              <option key={trade} value={trade}>{trade}</option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Location"
          error={errors.location?.message}
        >
          <input
            type="text"
            {...register('location')}
            placeholder="e.g., New York, NY"
            className="w-full rounded-lg border-gray-300"
          />
        </FormField>

        <FormField
          label="Budget ($)"
          error={errors.budget?.message}
        >
          <input
            type="number"
            {...register('budget', { valueAsNumber: true })}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full rounded-lg border-gray-300"
          />
        </FormField>

        <FormField
          label="Deadline"
          error={errors.deadline?.message}
        >
          <input
            type="date"
            {...register('deadline')}
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
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <LoadingSpinner />
          ) : (
            'Create Project'
          )}
        </button>
      </div>
    </form>
  )
})