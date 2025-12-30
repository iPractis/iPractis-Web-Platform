'use client'

import React, { useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useMessagesQuery } from '@/src/hooks/useMessagesQuery'
import { RealtimeChat } from '@/src/components/Chat/Realtime'
import { useAuth } from '@/src/hooks/useAuth'

export default function ChatRoomPage({ params }) {
  const { id: roomId } = use(params)

  // ALL HOOKS MUST RUN FIRST
  const router = useRouter()
  const { user, loading, authenticated } = useAuth()
  const { data: initialMessages } = useMessagesQuery(roomId)

  // 🔥 Correct place to mark room as read
  useEffect(() => {
    if (!roomId || !authenticated) return

    fetch(`/api/chat/rooms/${roomId}/read`, {
      method: "POST"
    }).catch((err) => console.log("Failed to mark read:", err))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading chat…
      </div>
    )
  }

  if (!authenticated || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Not authenticated
      </div>
    )
  }

  const userId = user.userId
  const username = user.firstName || "You"

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 border-b flex justify-between">
        <div>
          <h1 className="text-lg font-semibold">Chat Room</h1>
          <p className="text-sm text-muted-foreground">{roomId}</p>
        </div>

        <button
          className="px-3 py-1 bg-gray-700 text-white rounded"
          onClick={() => router.push('/chat')}
        >
          Leave
        </button>
      </header>

      <RealtimeChat
        roomName={roomId}
        username={username}
        userId={userId}
        messages={initialMessages}
      />
    </div>
  )
}
