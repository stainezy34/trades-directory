import type { TradeType } from '../utils/filters'

export interface Profile {
  id: string
  created_at: string
  updated_at: string
  full_name: string
  business_name: string | null
  avatar_url: string | null
  trade_type: TradeType[]
  hourly_rate: number | null
  bio: string | null
  location: string
  available: boolean
  rating: number
  phone?: string
  website?: string
  social_links?: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
}