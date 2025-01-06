import { useState, useEffect, useCallback } from 'react'
import { useProjects } from '../../lib/hooks/useProjects'
import { ProjectList } from '../../components/projects/ProjectList'
import { ProjectFilters } from '../../components/projects/ProjectFilters'
import { ErrorBoundary } from '../../components/shared/ErrorBoundary'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'
import { useMemoizedFilter } from '../../lib/hooks/useMemoizedFilter'
import type { Project } from '../../lib/types/project'
import type { FilterParams } from '../../lib/utils/filters'

export function ProjectsPage() {
  const { fetchProjects, loading, error } = useProjects()
  const [projects, setProjects] = useState<Project[]>([])
  const [filters, setFilters] = useState<FilterParams>({})

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects()
      setProjects(data)
    }
    loadProjects()
  }, [fetchProjects])

  const filterProject = useCallback((project: Project, filters: FilterParams) => {
    if (filters.tradeType && project.tradeType !== filters.tradeType) return false
    if (filters.location && !project.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    return true
  }, [])

  const filteredProjects = useMemoizedFilter(projects, filters, filterProject)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Available Projects</h1>
      </div>

      <ErrorBoundary>
        <ProjectFilters
          projects={projects}
          onFilter={setFilters}
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