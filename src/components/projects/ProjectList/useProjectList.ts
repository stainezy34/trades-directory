import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase/client'
import type { Project } from '../../../lib/types/project'

type Props = {
  tradesPersonId?: string
  clientId?: string
}

export function useProjectList({ tradesPersonId, clientId }: Props) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let query = supabase.from('projects').select('*')

        if (tradesPersonId) {
          query = query.eq('tradesperson_id', tradesPersonId)
        }
        if (clientId) {
          query = query.eq('client_id', clientId)
        }

        const { data, error: fetchError } = await query
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        setProjects(data || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [tradesPersonId, clientId])

  return { projects, loading, error }
}