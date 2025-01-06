import { CertificationCard } from './CertificationCard'
import { LoadingSpinner } from '../shared/LoadingSpinner'
import type { Certification } from '../../lib/types/certification'

type Props = {
  certifications: Certification[]
  isOwner: boolean
  onDelete?: (id: string) => Promise<void>
  loading?: boolean
}

export function CertificationList({ certifications, isOwner, onDelete, loading }: Props) {
  if (loading) {
    return <LoadingSpinner />
  }

  if (certifications.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed">
        <p className="text-gray-500">No certifications or licenses added yet</p>
        {isOwner && (
          <p className="text-sm text-gray-400 mt-1">
            Add your professional certifications to showcase your qualifications
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {certifications.map((certification) => (
        <CertificationCard
          key={certification.id}
          certification={certification}
          isOwner={isOwner}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}