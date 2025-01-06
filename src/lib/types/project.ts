export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'

export interface Project {
  id: string
  title: string
  description: string
  tradeType: string
  location: string
  budget: number
  deadline: string
  estimatedDuration: string
  status: ProjectStatus
  clientId: string
  createdAt: string
  updatedAt: string
}