import { cn } from '../../../lib/utils/cn'

type Props = {
  children: React.ReactNode
  className?: string
}

export function SkeletonContainer({ children, className }: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  )
}