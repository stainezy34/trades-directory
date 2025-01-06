import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import type { Database } from '../supabase/types'

type AvailabilitySlot = Database['public']['Tables']['availability_slots']['Row']

export function useAvailability(tradesPersonId: string) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('availability_slots')
          .select('*')
          .eq('tradesperson_id', tradesPersonId)
          .gte('start_time', new Date().toISOString())
          .order('start_time', { ascending: true })

        if (fetchError) throw fetchError
        setSlots(data || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch availability')
      } finally {
        setLoading(false)
      }
    }

    fetchSlots()

    // Subscribe to changes
    const subscription = supabase
      .channel('availability_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'availability_slots' },
        (payload) => {
          if (payload.new) {
            setSlots(current => [...current, payload.new as AvailabilitySlot])
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [tradesPersonId])

  const addSlot = async (startTime: Date, endTime: Date) => {
    try {
      const { error: insertError } = await supabase
        .from('availability_slots')
        .insert({
          tradesperson_id: tradesPersonId,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString()
        })

      if (insertError) throw insertError
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add slot')
      return false
    }
  }

  const updateSlotStatus = async (slotId: string, status: 'available' | 'booked' | 'unavailable') => {
    try {
      const { error: updateError } = await supabase
        .from('availability_slots')
        .update({ status })
        .eq('id', slotId)

      if (updateError) throw updateError
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update slot')
      return false
    }
  }

  const deleteSlot = async (slotId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('availability_slots')
        .delete()
        .eq('id', slotId)

      if (deleteError) throw deleteError
      setSlots(current => current.filter(slot => slot.id !== slotId))
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete slot')
      return false
    }
  }

  return {
    slots,
    loading,
    error,
    addSlot,
    updateSlotStatus,
    deleteSlot
  }
}