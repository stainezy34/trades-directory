export type BidStatus = 'pending' | 'accepted' | 'rejected'

export interface Bid {
  id: string
  projectId: string
  tradespersonId: string
  amount: number
  estimatedDuration: string
  proposal: string
  status: BidStatus
  createdAt: string
  updatedAt: string
  tradesperson?: {
    fullName: string
    businessName?: string | null
    rating?: number
  }
}