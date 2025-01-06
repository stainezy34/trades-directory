import { useState } from 'react'
import { supabase } from '../supabase/client'
import type { Project } from '../types/project'
import type { Database } from '../supabase/types'

type ProjectRow = Database['public']['Tables']['projects']['Row']

function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    tradeType: row.trade_type,
    location: row.location,
    budget: Number(row.budget),
    deadline: row.deadline,
    estimatedDuration: row.estimated_duration,
    status: row.status as Project['status'],
    clientId: row.client_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

export function useProjects() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      return data.map(mapProjectRow)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch projects'
      setError(message)
      return []
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (project: Omit<Project, 'id' | 'status' | 'clientId' | 'createdAt' | 'updatedAt'>) => {
    setError(null)

    try {
      const { error: createError } = await supabase
        .from('projects')
        .insert(project)

      if (createError) throw createError
      return true
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to create project'
      setError(message)
      return false
    }
  }

  const updateProjectStatus = async (projectId: string, status: Project['status']) => {
    setError(null)

    try {
      const { error: updateError } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', projectId)

      if (updateError) throw updateError
      return true
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to update project'
      setError(message)
      return false
    }
  }

  return {
    loading,
    error,
    fetchProjects,
    createProject,
    updateProjectStatus
  }
}