import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TRADE_TYPES } from '../../../lib/utils/filters'
import type { Profile } from '../../../lib/types/profile'

const tradeInfoSchema = z.object({
  trade_type: z.array(z.enum(TRADE_TYPES)).min(1, 'Select at least one trade'),
  hourly_rate: z.number().min(0, 'Hourly rate must be positive').optional(),
  available: z.boolean()
})

type TradeInfoData = z.infer<typeof tradeInfoSchema>

type Props = {
  initialData: Profile
  onSubmit: (data: TradeInfoData) => void
  onBack: () => void
  submitting: boolean
}

export function TradeInfoForm({ initialData, onSubmit, onBack, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TradeInfoData>({
    resolver: zodResolver(tradeInfoSchema),
    defaultValues: {
      trade_type: initialData.trade_type,
      hourly_rate: initialData.hourly_rate || undefined,
      available: initialData.available
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Trade Types</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {TRADE_TYPES.map((trade) => (
            <label key={trade} className="flex items-center">
              <input
                type="checkbox"
                value={trade}
                {...register('trade_type')}
                className="rounded border-gray-300 text-blue-600"
              />
              <span className="ml-2">{trade}</span>
            </label>
          ))}
        </div>
        {errors.trade_type && (
          <p className="mt-1 text-sm text-red-600">{errors.trade_type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Hourly Rate ($)
        </label>
        <input
          type="number"
          {...register('hourly_rate', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-lg border-gray-300"
          min="0"
          step="0.01"
        />
        {errors.hourly_rate && (
          <p className="mt-1 text-sm text-red-600">{errors.hourly_rate.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('available')}
            className="rounded border-gray-300 text-blue-600"
          />
          <span className="ml-2">Available for work</span>
        </label>
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
          {submitting ? 'Saving...' : 'Next'}
        </button>
      </div>
    </form>
  )
}