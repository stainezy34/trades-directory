import { memo } from 'react'
import { Loader } from 'lucide-react'

export const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <Loader className="w-6 h-6 animate-spin text-blue-600" />
    </div>
  )
})