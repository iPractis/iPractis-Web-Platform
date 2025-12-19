import { supabaseServer } from "@/src/lib/supabaseClient";

export async function getValidGoogleAccessToken(userId) {
  const { data: user, error } = await supabaseServer
    .from("users")
    .select(
      "google_access_token, google_refresh_token, google_token_expires_at, google_connected"
    )
    .eq("user_id", userId)
    .single();

  if (error || !user?.google_refresh_token || !user.google_connected) {
    throw new Error("Google Calendar not connected");
  }

  const now = new Date();

  // ✅ Token still valid
  if (
    user.google_token_expires_at &&
    now < new Date(user.google_token_expires_at)
  ) {
    return user.google_access_token;
  }

  // 🔁 Refresh token
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: user.google_refresh_token,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    // token revoked
    await supabaseServer
      .from("users")
      .update({ google_connected: false })
      .eq("user_id", userId);

    throw new Error("Google token refresh failed");
  }

  await supabaseServer
    .from("users")
    .update({
      google_access_token: data.access_token,
      google_token_expires_at: new Date(
        Date.now() + data.expires_in * 1000
      ),
    })
    .eq("user_id", userId);

  return data.access_token;
}
