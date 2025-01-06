import { memo } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/utils/cn'

type Props = {
  message: string
  className?: string
}

export const ErrorAlert = memo(function ErrorAlert({ message, className }: Props) {
  return (
    <div className={cn(
      "p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2",
      className
    )}>
      <AlertTriangle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  )
})