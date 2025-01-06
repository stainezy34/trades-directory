import type { ProjectStatus } from '../../../lib/types/project'

type Props = {
  value?: ProjectStatus
  onChange: (status: ProjectStatus | undefined) => void
}

export function StatusFilter({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Status
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value as ProjectStatus || undefined)}
        className="w-full rounded-lg border-gray-300"
      >
        <option value="">All Statuses</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  )
}