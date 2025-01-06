import { RecommendedCard } from './RecommendedCard'
import type { Database } from '../../../lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  recommendations: Array<{
    tradesperson: Profile
    score: number
  }>
}

export function RecommendedList({ recommendations }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recommended Tradespeople</h2>
      <div className="grid gap-4">
        {recommendations.map(({ tradesperson, score }) => (
          <RecommendedCard
            key={tradesperson.id}
            tradesperson={tradesperson}
            matchScore={score}
          />
        ))}
      </div>
    </div>
  )
}