import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { supabaseServer } from "@/src/lib/supabaseClient";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/calendar openid email profile",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],

  callbacks: {
    /**
     * Runs on sign-in & token refresh
     */
    async jwt({ token, account, profile }) {
      // On first sign-in
      if (account && profile?.email) {
        // 🔍 Find or create user in your DB
        const { data: user, error } = await supabaseServer
          .from("users")
          .select("user_id")
          .eq("email", profile.email)
          .single();

        if (error) {
          console.error("[Auth][JWT] Failed to fetch user", error);
        } else {
          token.userId = user.user_id;
        }

        // Keep Google tokens ONLY if you still need them short-term
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000;
      }

      return token;
    },

    /**
     * Expose fields to client/server session
     */
    async session({ session, token }) {
      if (token?.userId) {
        session.user.id = token.userId;
      }

      // ⚠️ Optional: keep temporarily, but NOT required for calendar sync
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});
