'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import Image from "next/image";

export default function ChatListPage() {
  const { authenticated, loading, user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && authenticated) {
      loadRooms();
    }
  }, [loading, authenticated]);

  const loadRooms = async () => {
    const res = await fetch("/api/chat/rooms");
    const data = await res.json();
    setRooms(data.rooms || []);
  };

  if (loading) return <div className="p-6">Loading chats...</div>;
  if (!authenticated) return <div className="p-6">You must be logged in to view chats.</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chats</h1>

      {rooms.length === 0 && (
        <p className="text-muted-foreground">No chats available.</p>
      )}

      <div className="space-y-2">
        {rooms.map((room) => {
          const isOwnLastMsg = room.last_message_sender_id === user?.userId;
          const lastMessageLabel = isOwnLastMsg ? `You: ${room.last_message}` : room.last_message;

          return (
            <div
              key={room.id}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => router.push(`/chat/room/${room.id}`)}
            >
              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold truncate">{room.room_name}</h2>

                  {/* Time */}
                  {room.last_message_at && (
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(room.last_message_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>

                {/* Last message */}
                <p className="text-sm text-gray-600 truncate mt-1">
                  {lastMessageLabel || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
