import { memo } from 'react'
import { MapPin, Calendar, Clock, DollarSign } from 'lucide-react'
import { Badge } from '../../../../components/shared/Badge'
import { formatCurrency } from '../../../../lib/utils'
import type { Project } from '../../../../lib/types/project'

type Props = {
  project: Project
}

export const ProjectHeader = memo(function ProjectHeader({ project }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <Badge
            variant={project.status === 'open' ? 'success' : 'default'}
            className="mt-2"
          >
            {project.status}
          </Badge>
        </div>
        <Badge variant="default">{project.tradeType}</Badge>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5" />
          <span>{project.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>{new Date(project.deadline).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-5 h-5" />
          <span>{project.estimatedDuration}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="w-5 h-5" />
          <span>{formatCurrency(project.budget)}</span>
        </div>
      </div>
    </div>
  )
})