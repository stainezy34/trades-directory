import { Calendar } from 'lucide-react'

type Props = {
  projectDate: string
  projectDescription: string
  comment: string
}

export function ReviewContent({ projectDate, projectDescription, comment }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>Project completed on {projectDate}</span>
      </div>

      <div>
        <h4 className="font-medium mb-1">Project Description</h4>
        <p className="text-gray-600">{projectDescription}</p>
      </div>

      <div>
        <h4 className="font-medium mb-1">Review</h4>
        <p className="text-gray-600">{comment}</p>
      </div>
    </div>
  )
}