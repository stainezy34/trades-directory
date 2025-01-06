import { Calendar, Clock, MapPin, Briefcase } from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from '../shared/Badge'
import type { Project } from '../../lib/types/project'

type Props = {
  project: Project
  onBid?: () => void
}

export function ProjectCard({ project, onBid }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <Badge variant={project.status === 'open' ? 'success' : 'default'}>
          {project.status}
        </Badge>
      </div>

      <p className="mt-2 text-gray-600">{project.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{project.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(project.deadline), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{project.estimatedDuration}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span>${project.budget}</span>
        </div>
      </div>

      {project.status === 'open' && onBid && (
        <button
          onClick={onBid}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition-colors"
        >
          Place Bid
        </button>
      )}
    </div>
  )
}