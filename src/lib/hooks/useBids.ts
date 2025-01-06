import { useState } from 'react'
import { supabase } from '../supabase/client'
import type { Bid } from '../types/bid'

type UseBidsProps = {
  projectId?: string
  tradesPersonId?: string
}

export function useBids({ projectId, tradesPersonId }: UseBidsProps = {}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBids = async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('bids')
        .select(`
          *,
          tradesperson:profiles!tradesperson_id (
            full_name,
            business_name,
            rating
          )
        `)

      if (projectId) {
        query = query.eq('project_id', projectId)
      }
      if (tradesPersonId) {
        query = query.eq('tradesperson_id', tradesPersonId)
      }

      const { data, error: fetchError } = await query
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      return data.map(bid => ({
        id: bid.id,
        projectId: bid.project_id,
        tradespersonId: bid.tradesperson_id,
        amount: Number(bid.amount),
        estimatedDuration: bid.estimated_duration,
        proposal: bid.proposal,
        status: bid.status,
        createdAt: bid.created_at,
        updatedAt: bid.updated_at,
        tradesperson: bid.tradesperson ? {
          fullName: bid.tradesperson.full_name,
          businessName: bid.tradesperson.business_name,
          rating: bid.tradesperson.rating
        } : undefined
      })) as Bid[]
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch bids'
      setError(message)
      return []
    } finally {
      setLoading(false)
    }
  }

  const submitBid = async (bid: Omit<Bid, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'tradesperson'>) => {
    setError(null)

    try {
      const { error: submitError } = await supabase
        .from('bids')
        .insert({
          project_id: bid.projectId,
          tradesperson_id: bid.tradespersonId,
          amount: bid.amount,
          estimated_duration: bid.estimatedDuration,
          proposal: bid.proposal,
          status: 'pending'
        })

      if (submitError) throw submitError
      return true
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to submit bid'
      setError(message)
      return false
    }
  }

  const updateBidStatus = async (bidId: string, status: Bid['status']) => {
    setError(null)

    try {
      const { error: updateError } = await supabase
        .from('bids')
        .update({ status })
        .eq('id', bidId)

      if (updateError) throw updateError
      return true
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to update bid'
      setError(message)
      return false
    }
  }

  return {
    loading,
    error,
    fetchBids,
    submitBid,
    updateBidStatus
  }
}