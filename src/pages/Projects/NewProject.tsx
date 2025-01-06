import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../lib/hooks/useProjects'
import { ProjectForm } from '../../components/projects/ProjectForm'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'
import { ErrorBoundary } from '../../components/shared/ErrorBoundary'

export function NewProject() {
  const navigate = useNavigate()
  const { createProject, loading, error } = useProjects()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data: any) => {
    setSubmitting(true)
    try {
      const success = await createProject(data)
      if (success) {
        navigate('/projects')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Post a New Project</h1>
        
        <ErrorBoundary>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ProjectForm
              onSubmit={handleSubmit}
              isSubmitting={submitting}
            />
          </div>
        </ErrorBoundary>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}