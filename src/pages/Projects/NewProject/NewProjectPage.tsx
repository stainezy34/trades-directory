import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../../lib/hooks/useProjects'
import { ProjectFormContainer } from './components/ProjectFormContainer'
import { ErrorAlert } from '../../../components/shared/ErrorAlert'
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner'
import type { ProjectFormData } from './types'

export function NewProjectPage() {
  const navigate = useNavigate()
  const { createProject, loading, error } = useProjects()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data: ProjectFormData) => {
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
        
        <ProjectFormContainer
          onSubmit={handleSubmit}
          isSubmitting={submitting}
        />

        {error && <ErrorAlert message={error} className="mt-4" />}
      </div>
    </div>
  )
}