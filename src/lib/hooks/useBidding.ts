import { useState } from 'react'
import { supabase } from '../supabase/client'
import type { BidInput } from '../validations/bid'

export function useBidding(projectId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitBid = async (bid: BidInput) => {
    setLoading(true)
    setError(null)

    try {
      const { error: submitError } = await supabase
        .from('bids')
        .insert({
          project_id: projectId,
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
    } finally {
      setLoading(false)
    }
  }

  const updateBidStatus = async (bidId: string, status: 'accepted' | 'rejected') => {
    setLoading(true)
    setError(null)

    try {
      const { error: updateError } = await supabase
        .from('bids')
        .update({ status })
        .eq('id', bidId)

      if (updateError) throw updateError

      // If bid is accepted, update project status and reject other bids
      if (status === 'accepted') {
        const { error: projectError } = await supabase
          .from('projects')
          .update({ status: 'in_progress' })
          .eq('id', projectId)

        if (projectError) throw projectError

        // Reject other bids
        const { error: rejectError } = await supabase
          .from('bids')
          .update({ status: 'rejected' })
          .eq('project_id', projectId)
          .neq('id', bidId)

        if (rejectError) throw rejectError
      }

      return true
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to update bid'
      setError(message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    submitBid,
    updateBidStatus
  }
}