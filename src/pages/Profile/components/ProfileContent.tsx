import { lazy, Suspense } from 'react'
import { TradeProfileSkeleton } from '../../../components/trades/skeletons/TradeProfileSkeleton'
import type { Profile } from '../../../lib/types/profile'

const ReviewList = lazy(() => import('../../../components/reviews/ReviewList'))
const ProjectList = lazy(() => import('../../../components/projects/ProjectList'))

type Props = {
  profile: Profile
}

export function ProfileContent({ profile }: Props) {
  return (
    <div className="mt-8 grid gap-8 md:grid-cols-2">
      <section>
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <Suspense fallback={<TradeProfileSkeleton />}>
          <ReviewList tradesPersonId={profile.id} />
        </Suspense>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
        <Suspense fallback={<TradeProfileSkeleton />}>
          <ProjectList tradesPersonId={profile.id} />
        </Suspense>
      </section>
    </div>
  )
}