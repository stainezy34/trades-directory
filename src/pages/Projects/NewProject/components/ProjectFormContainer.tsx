import { memo } from 'react'
import { ProjectForm } from './ProjectForm'
import { ErrorBoundary } from '../../../../components/shared/ErrorBoundary'
import type { ProjectFormData } from '../types'

type Props = {
  onSubmit: (data: ProjectFormData) => Promise<void>
  isSubmitting?: boolean
}

export const ProjectFormContainer = memo(function ProjectFormContainer({
  onSubmit,
  isSubmitting
}: Props) {
  return (
    <ErrorBoundary>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ProjectForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </ErrorBoundary>
  )
})