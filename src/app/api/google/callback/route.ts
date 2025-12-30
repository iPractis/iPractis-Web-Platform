import { requireUser } from "@/src/lib/requireUser";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { authorized, user } = await requireUser();

  console.log("authorized in callback", authorized, user)
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const email = searchParams.get("state");

  if (!code || !email) {
    return Response.json({ error: "Invalid callback" }, { status: 400 });
  }

  // Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/google/callback`,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error("Google token exchange failed", tokens);
    return Response.json({ error: "Token exchange failed" }, { status: 400 });
  }

  const userId = searchParams.get("state");

  if (!userId) {
    return NextResponse.json({ error: "Missing state" }, { status: 400 });
  }

  await supabaseServer
    .from("users")
    .update({
      google_access_token: tokens.access_token,
      google_refresh_token: tokens.refresh_token,
      google_token_expires_at: new Date(
        Date.now() + tokens.expires_in * 1000
      ),
      google_connected: true,
    })
    .eq("user_id", userId);

  return Response.redirect(
    new URL("/dashboard?calendar=connected", req.url)
  );
};
