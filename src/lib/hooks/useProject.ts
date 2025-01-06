import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import type { Project } from '../types/project'

export function useProject(projectId: string) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single()

        if (fetchError) throw fetchError
        setProject(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load project')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()

    // Subscribe to project updates
    const subscription = supabase
      .channel(`project:${projectId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects', filter: `id=eq.${projectId}` },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setProject(null)
          } else {
            setProject(payload.new as Project)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [projectId])

  return { project, loading, error }
}