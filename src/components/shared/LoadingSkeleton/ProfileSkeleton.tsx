import { LoadingSkeleton } from '.'

export function ProfileSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex gap-6">
        <LoadingSkeleton.Item variant="avatar" className="w-32 h-32" />
        
        <div className="flex-1 space-y-4">
          <LoadingSkeleton.Item variant="title" />
          <LoadingSkeleton.Item className="w-3/4 h-4" />
          <LoadingSkeleton.Item className="w-1/2 h-4" />
          
          <div className="flex gap-2">
            <LoadingSkeleton.Item className="w-24 h-8" />
            <LoadingSkeleton.Item className="w-24 h-8" />
          </div>
        </div>
      </div>
    </div>
  )
}