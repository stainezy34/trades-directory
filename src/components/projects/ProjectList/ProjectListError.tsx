import { AlertTriangle } from 'lucide-react'

type Props = {
  message: string
}

export function ProjectListError({ message }: Props) {
  return (
    <div className="p-4 bg-red-50 rounded-lg">
      <div className="flex items-center gap-2 text-red-600">
        <AlertTriangle className="w-5 h-5" />
        <p>{message}</p>
      </div>
    </div>
  )
}