import { memo } from 'react'
import { ProjectMilestones } from '../../../../components/projects/ProjectMilestones'
import type { Project } from '../../../../lib/types/project'

type Props = {
  project: Project
}

export const ProjectDetails = memo(function ProjectDetails({ project }: Props) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Project Description</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 whitespace-pre-wrap">{project.description}</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ProjectMilestones project={project} isOwner={false} />
        </div>
      </section>
    </div>
  )
})