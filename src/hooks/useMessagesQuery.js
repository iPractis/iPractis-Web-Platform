'use client'

import { useEffect, useState } from 'react'
import { supabaseClient } from '../lib/supabaseClient'

export function useMessagesQuery(roomId) {
    const supabase = supabaseClient   // ✅ correct usage
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (!roomId) return

        async function load() {
            console.log("loading messages for roomId:", roomId)

            const { data, error } = await supabase
                .from('chat_messages')
                .select('*')
                .eq('room_id', roomId)
                .order('created_at', { ascending: true })

            if (error) {
                console.error("error in getting chat", error)
                return
            }

            console.log("fetched messages:", data)

            const mapped = data.map((m) => ({
                id: m.id,
                content: m.content,
                user: {
                    id: m.user_id,
                    name: m.user_role
                },
                createdAt: m.created_at
            }))

            setMessages(mapped)
        }

        load()
    }, [roomId])

    return { data: messages }
}
