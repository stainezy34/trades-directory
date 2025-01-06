export interface Review {
  id: string
  reviewerId: string
  tradespersonId: string
  rating: number
  comment: string
  projectDate: string
  projectDescription: string
  images?: string[]
  createdAt: string
  updatedAt: string
  reviewer?: {
    fullName: string
    avatarUrl?: string | null
  }
}