import { useEffect, useState } from "react";
import { supabaseClient } from "@/src/lib/supabaseClient";
import { getMyNotifications } from "../lib/notification/getNotifications";

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch
  useEffect(() => {
    if (!userId) return;

    async function load() {
      const { data } = await getMyNotifications(userId);
      setNotifications(data || []);
      setLoading(false);
    }

    load();
  }, [userId]);

  // Realtime subscription
  useEffect(() => {
    if (!userId) return;

    const channel = supabaseClient
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        payload => {
          setNotifications(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [userId]);

  const unreadCount = notifications.filter(n => !n.read_at).length;

  return {
    notifications,
    unreadCount,
    loading,
    setNotifications,
  };
}
