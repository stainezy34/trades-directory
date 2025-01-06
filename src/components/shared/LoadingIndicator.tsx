import { Loader } from 'lucide-react'

type Props = {
  className?: string
}

export function LoadingIndicator({ className }: Props) {
  return (
    <div className={`flex justify-center py-4 ${className}`}>
      <Loader className="w-6 h-6 animate-spin text-blue-600" />
    </div>
  )
}