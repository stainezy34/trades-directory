import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PaginationState } from '../../lib/utils/pagination'
import { PAGE_SIZES } from '../../lib/utils/pagination'
import { cn } from '../../lib/utils'

type Props = {
  pagination: PaginationState
  onChange: (updates: Partial<PaginationState>) => void
  className?: string
}

export function Pagination({ pagination, onChange, className }: Props) {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize)
  
  return (
    <div className={cn("flex items-center justify-between gap-4 py-4", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <select
          value={pagination.pageSize}
          onChange={(e) => onChange({ pageSize: Number(e.target.value), page: 1 })}
          className="border rounded-md px-2 py-1 text-sm"
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {pagination.pageSize * (pagination.page - 1) + 1}-
          {Math.min(pagination.pageSize * pagination.page, pagination.total)} of {pagination.total}
        </span>
        
        <div className="flex gap-1">
          <button
            onClick={() => onChange({ page: pagination.page - 1 })}
            disabled={pagination.page === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 
                     disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onChange({ page: pagination.page + 1 })}
            disabled={pagination.page === totalPages}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 
                     disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}