import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { CertificationType } from '../../lib/types/certification'

const certificationSchema = z.object({
  type: z.enum(['license', 'certification', 'qualification'] as const),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  issuer: z.string().min(2, 'Issuer must be at least 2 characters'),
  issueDate: z.string().nonempty('Issue date is required'),
  expiryDate: z.string().optional(),
  verificationUrl: z.string().url().optional(),
  documentUrl: z.string().url().optional(),
})

type CertificationFormData = z.infer<typeof certificationSchema>

type Props = {
  onSubmit: (data: CertificationFormData) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
}

export function CertificationForm({ onSubmit, onCancel, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-lg border-gray-300"
          >
            <option value="license">License</option>
            <option value="certification">Certification</option>
            <option value="qualification">Qualification</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title')}
            className="mt-1 block w-full rounded-lg border-gray-300"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Issuer</label>
          <input
            type="text"
            {...register('issuer')}
            className="mt-1 block w-full rounded-lg border-gray-300"
          />
          {errors.issuer && (
            <p className="mt-1 text-sm text-red-600">{errors.issuer.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Issue Date</label>
          <input
            type="date"
            {...register('issueDate')}
            className="mt-1 block w-full rounded-lg border-gray-300"
          />
          {errors.issueDate && (
            <p className="mt-1 text-sm text-red-600">{errors.issueDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Expiry Date (Optional)
        </label>
        <input
          type="date"
          {...register('expiryDate')}
          className="mt-1 block w-full rounded-lg border-gray-300"
        />
        {errors.expiryDate && (
          <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Verification URL (Optional)
        </label>
        <input
          type="url"
          {...register('verificationUrl')}
          className="mt-1 block w-full rounded-lg border-gray-300"
          placeholder="https://"
        />
        {errors.verificationUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.verificationUrl.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Document URL (Optional)
        </label>
        <input
          type="url"
          {...register('documentUrl')}
          className="mt-1 block w-full rounded-lg border-gray-300"
          placeholder="https://"
        />
        {errors.documentUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.documentUrl.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Add Certification'}
        </button>
      </div>
    </form>
  )
}