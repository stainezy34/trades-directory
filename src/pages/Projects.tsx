import { useState, useEffect } from 'react'
import { useProjects } from '../lib/hooks/useProjects'
import { ProjectList } from '../components/projects/ProjectList'
import { ProjectFilters } from '../components/projects/ProjectFilters'
import { ErrorBoundary } from '../components/shared/ErrorBoundary'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import type { Project } from '../lib/types/project'

export function Projects() {
  const { fetchProjects, loading, error } = useProjects()
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects()
      setProjects(data)
      setFilteredProjects(data)
    }
    loadProjects()
  }, [fetchProjects])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Available Projects</h1>
      </div>

      <ErrorBoundary>
        <ProjectFilters
          projects={projects}
          onFilter={setFilteredProjects}
        />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <ProjectList projects={filteredProjects} />
        )}
      </ErrorBoundary>
    </div>
  )
}