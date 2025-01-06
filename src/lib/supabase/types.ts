export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string
          business_name: string | null
          avatar_url: string | null
          trade_type: string[]
          hourly_rate: number | null
          bio: string | null
          location: string
          available: boolean
          rating: number
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name: string
          business_name?: string | null
          avatar_url?: string | null
          trade_type: string[]
          hourly_rate?: number | null
          bio?: string | null
          location: string
          available?: boolean
          rating?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          business_name?: string | null
          avatar_url?: string | null
          trade_type?: string[]
          hourly_rate?: number | null
          bio?: string | null
          location?: string
          available?: boolean
          rating?: number
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          reviewer_id: string
          tradesperson_id: string
          rating: number
          comment: string
          project_date: string
          project_description: string
          images: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          reviewer_id: string
          tradesperson_id: string
          rating: number
          comment: string
          project_date: string
          project_description: string
          images?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          reviewer_id?: string
          tradesperson_id?: string
          rating?: number
          comment?: string
          project_date?: string
          project_description?: string
          images?: string[] | null
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          sender_id: string
          recipient_id: string
          content: string
          read: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          sender_id: string
          recipient_id: string
          content: string
          read?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          sender_id?: string
          recipient_id?: string
          content?: string
          read?: boolean
        }
      }
    }
  }
}