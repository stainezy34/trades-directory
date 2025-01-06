import { LoadingSkeleton } from '.'

export function ProjectSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex justify-between">
        <LoadingSkeleton.Item variant="title" />
        <LoadingSkeleton.Item className="w-24 h-6" />
      </div>
      
      <LoadingSkeleton.Item className="h-16" />
      
      <div className="grid grid-cols-2 gap-4">
        <LoadingSkeleton.Item className="h-8" />
        <LoadingSkeleton.Item className="h-8" />
      </div>
    </div>
  )
}