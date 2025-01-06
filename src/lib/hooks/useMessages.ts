import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { useAuth } from './useAuth'
import type { Database } from '../supabase/types'
import type { Message, MessageStatus } from '../types/message'

export function useMessages(recipientId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [typing, setTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*, sender:profiles!sender_id(full_name, avatar_url)')
          .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
          .order('created_at', { ascending: true })

        if (error) throw error
        setMessages(data || [])
        
        // Update unread count
        const unread = data?.filter(m => 
          m.recipient_id === user.id && !m.read
        ).length || 0
        setUnreadCount(unread)
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()

    // Subscribe to new messages
    const messageSubscription = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          const message = payload.new as Message
          if (message.recipient_id === user.id || message.sender_id === user.id) {
            // Fetch sender details
            const { data: sender } = await supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', message.sender_id)
              .single()

            setMessages(current => [...current, { ...message, sender }])
            
            if (message.recipient_id === user.id) {
              setUnreadCount(count => count + 1)
            }
          }
        }
      )
      .subscribe()

    // Subscribe to typing indicators
    const typingSubscription = supabase
      .channel(`typing:${recipientId}`)
      .on('presence', { event: 'sync' }, () => {
        const typingUsers = typingSubscription.presenceState()
        setTyping(Object.keys(typingUsers).length > 0)
      })
      .subscribe()

    return () => {
      messageSubscription.unsubscribe()
      typingSubscription.unsubscribe()
    }
  }, [user, recipientId])

  const sendMessage = async (content: string) => {
    if (!user) return false

    try {
      const message = {
        sender_id: user.id,
        recipient_id: recipientId,
        content,
        status: 'sent' as MessageStatus,
        read: false
      }

      const { error } = await supabase
        .from('messages')
        .insert(message)

      return !error
    } catch (error) {
      console.error('Error sending message:', error)
      return false
    }
  }

  const markAsRead = async (messageIds: string[]) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .in('id', messageIds)

      if (!error) {
        setUnreadCount(count => Math.max(0, count - messageIds.length))
      }
    } catch (error) {
      console.error('Error marking messages as read:', error)
    }
  }

  const setTypingStatus = async (isTyping: boolean) => {
    const channel = supabase.channel(`typing:${recipientId}`)
    if (isTyping) {
      await channel.track({ user_id: user?.id })
    } else {
      await channel.untrack()
    }
  }

  return {
    messages,
    loading,
    typing,
    unreadCount,
    sendMessage,
    markAsRead,
    setTypingStatus
  }
}