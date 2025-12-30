'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabaseClient } from '../lib/supabaseClient'

export function useRealtimeChat({ roomName, username , userId }) {
  const supabase = supabaseClient
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    if (!roomName) return

    setMessages([])

    const newChannel = supabase.channel(roomName)

    newChannel
      .on('broadcast', { event: 'message' }, (payload) => {
        setMessages((prev) => [...prev, payload.payload])
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') setIsConnected(true)
      })

    setChannel(newChannel)

    return () => {
      supabase.removeChannel(newChannel)
      setIsConnected(false)
    }
  }, [roomName])

  const sendMessage = useCallback(
    async (content) => {
      if (!channel || !isConnected) return

      const message = {
        id: crypto.randomUUID(),
        content,
        user: { name: username , id: userId },
        createdAt: new Date().toISOString()
      }

      // Optimistic UI
      setMessages((prev) => [...prev, message])

      // Broadcast realtime
      await channel.send({
        type: 'broadcast',
        event: 'message',
        payload: message
      })

      // Persist via server endpoint
      await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: message.id,
          room_id: roomName,
          content
        })
      })
    },
    [channel, isConnected, username, roomName. userId]
  )

  return { messages, sendMessage, isConnected }
}
