'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatList() {
  const [rooms, setRooms] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/chat/rooms')
      if (!res.ok) return

      const json = await res.json()
      setRooms(json.rooms || [])
    }
    load()
  }, [])

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-xl font-semibold">Your Chats</h3>

      {rooms.length === 0 && <p>No chats yet.</p>}

      {rooms.map((room) => (
        <div
          key={room.id}
          className="p-4 border rounded-md flex justify-between items-center"
        >
          <div>
            <div className="font-medium">{room.room_name || room.id}</div>
            <div className="text-sm text-muted-foreground">
              Booking: {room.booking_id}
            </div>
            <div className="text-sm text-muted-foreground">
              Expires: {room.expires_at && new Date(room.expires_at).toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => router.push(`/chat/room/${room.id}`)}
            className="px-3 py-1 rounded bg-blue-600 text-white"
          >
            Open
          </button>
        </div>
      ))}
    </div>
  )
}
