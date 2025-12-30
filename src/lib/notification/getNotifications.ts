import { supabaseClient } from "@/src/lib/supabaseClient";

export async function getMyNotifications(userId) {
  return supabaseClient
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);
}
