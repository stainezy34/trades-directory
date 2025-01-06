import type { Project } from '../types/project'
import type { Database } from '../supabase/types'
import { supabase } from '../supabase/client'

type Profile = Database['public']['Tables']['profiles']['Row']
type RecommendationFactors = {
  tradeMatch: number
  locationMatch: number
  availability: number
  rating: number
  completedProjects: number
  responseTime: number
}

export async function getRecommendations(project: Project, limit = 5) {
  try {
    // Get all tradespeople matching the project's trade type
    const { data: tradespeople, error: tradesError } = await supabase
      .from('profiles')
      .select('*')
      .contains('trade_type', [project.trade_type])
      .eq('available', true)

    if (tradesError) throw tradesError
    if (!tradespeople) return []

    const recommendations = await Promise.all(
      tradespeople.map(async (person) => {
        const factors = await calculateRecommendationFactors(person, project)
        const score = calculateOverallScore(factors)

        // Log recommendation for analytics
        await supabase.from('recommendation_logs').insert({
          project_id: project.id,
          tradesperson_id: person.id,
          score,
          factors
        })

        return { tradesperson: person, score, factors }
      })
    )

    // Sort by score and return top recommendations
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  } catch (error) {
    console.error('Error getting recommendations:', error)
    return []
  }
}

async function calculateRecommendationFactors(
  tradesperson: Profile,
  project: Project
): Promise<RecommendationFactors> {
  // Calculate trade type match
  const tradeMatch = tradesperson.trade_type.includes(project.trade_type) ? 1 : 0

  // Calculate location match (simple string match for now)
  const locationMatch = tradesperson.location.toLowerCase().includes(
    project.location.toLowerCase()
  ) ? 1 : 0.5

  // Check availability during project period
  const { count } = await supabase
    .from('availability_slots')
    .select('*', { count: 'exact' })
    .eq('tradesperson_id', tradesperson.id)
    .eq('status', 'available')
    .gte('start_time', new Date().toISOString())
    .lte('start_time', project.deadline)

  const availability = count ? count / 10 : 0 // Normalize to 0-1 range

  // Get completed projects count
  const { count: completedCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact' })
    .eq('status', 'completed')
    .eq('assigned_to', tradesperson.id)

  const completedProjects = Math.min(completedCount || 0, 20) / 20 // Normalize to 0-1 range

  // Calculate average response time from messages
  const { data: messages } = await supabase
    .from('messages')
    .select('created_at')
    .eq('sender_id', tradesperson.id)
    .order('created_at', { ascending: false })
    .limit(10)

  let responseTime = 0.5 // Default middle value
  if (messages && messages.length > 1) {
    const avgResponseTime = messages.reduce((acc, msg, i, arr) => {
      if (i === 0) return acc
      const diff = new Date(msg.created_at).getTime() - 
                  new Date(arr[i-1].created_at).getTime()
      return acc + diff
    }, 0) / (messages.length - 1)
    
    // Normalize to 0-1 range (24 hours = 0, instant = 1)
    responseTime = Math.max(0, 1 - (avgResponseTime / (24 * 60 * 60 * 1000)))
  }

  return {
    tradeMatch,
    locationMatch,
    availability,
    rating: tradesperson.rating / 5, // Normalize to 0-1 range
    completedProjects,
    responseTime
  }
}

function calculateOverallScore(factors: RecommendationFactors): number {
  const weights = {
    tradeMatch: 0.25,
    locationMatch: 0.15,
    availability: 0.15,
    rating: 0.20,
    completedProjects: 0.15,
    responseTime: 0.10
  }

  return Object.entries(factors).reduce((score, [factor, value]) => {
    return score + (value * weights[factor as keyof typeof weights])
  }, 0)
}