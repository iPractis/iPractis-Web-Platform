// src/app/api/google/session/route.ts
import { auth } from "@/src/lib/auth";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  return Response.json({
    user: req.auth.user,
    accessToken: req.auth.accessToken,
  });
});
