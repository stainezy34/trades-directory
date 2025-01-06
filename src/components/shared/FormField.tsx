import { memo } from 'react'

type Props = {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}

export const FormField = memo(function FormField({
  label,
  error,
  children,
  className = ''
}: Props) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
})