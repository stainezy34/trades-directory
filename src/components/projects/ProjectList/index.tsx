import { ProjectListContainer } from './ProjectListContainer'
import { ProjectListEmpty } from './ProjectListEmpty'
import { ProjectListError } from './ProjectListError'
import { useProjectList } from './useProjectList'

type Props = {
  tradesPersonId?: string
  clientId?: string
}

export function ProjectList({ tradesPersonId, clientId }: Props) {
  const { projects, loading, error } = useProjectList({ tradesPersonId, clientId })

  if (loading) {
    return <ProjectListContainer.Loading />
  }

  if (error) {
    return <ProjectListError message={error} />
  }

  if (projects.length === 0) {
    return <ProjectListEmpty />
  }

  return (
    <ProjectListContainer>
      {projects.map((project) => (
        <ProjectListContainer.Item key={project.id} project={project} />
      ))}
    </ProjectListContainer>
  )
}