import { supabaseClient } from "@/src/lib/supabaseClient";

export async function markNotificationRead(notificationId) {
  return supabaseClient
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId);
}
