import { ProjectCard } from '../ProjectCard'
import { LoadingSkeleton } from '../../shared/LoadingSkeleton'
import type { Project } from '../../../lib/types/project'

type ContainerProps = {
  children: React.ReactNode
}

type ItemProps = {
  project: Project
}

export function ProjectListContainer({ children }: ContainerProps) {
  return <div className="space-y-6">{children}</div>
}

function ProjectListItem({ project }: ItemProps) {
  return (
    <ProjectCard
      project={project}
      onBid={project.status === 'open' ? () => {} : undefined}
    />
  )
}

function ProjectListLoading() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <LoadingSkeleton key={i} className="h-48" />
      ))}
    </div>
  )
}

ProjectListContainer.Item = ProjectListItem
ProjectListContainer.Loading = ProjectListLoading