import { useState, useEffect } from 'react'
import { RecommendedList } from './RecommendedList'
import { LoadingSpinner } from '../../shared/LoadingSpinner'
import { getRecommendations } from '../../../lib/utils/recommendations'
import type { Project } from '../../../lib/types/project'
import type { Database } from '../../../lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  project: Project
}

export function RecommendedTradespeople({ project }: Props) {
  const [recommendations, setRecommendations] = useState<Array<{
    tradesperson: Profile
    score: number
  }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const results = await getRecommendations(project)
        setRecommendations(results)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load recommendations')
      } finally {
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [project])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>
  if (recommendations.length === 0) return null

  return <RecommendedList recommendations={recommendations} />
}