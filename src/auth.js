import Credentials from "next-auth/providers/credentials";
import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";

class CustomError extends AuthError {
  constructor(message) {
    super();
    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt", // keep JWT strategy
  },
  providers: [
    Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.BASE_URL}/api/auth/login-verify-otp`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                otp: credentials?.otp,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await res.json();

          if (!res.ok || !data?.token) {
            throw new CustomError(data?.detail || "Login failed");
          }

          // Return user object
          return {
            token: data.token,
            email: data.email,
            firstName: data.firstName || "", // optional
          };
        } catch (error) {
          throw new CustomError(error.message || "Login failed");
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Called on login or token refresh
    async jwt({ token, user, account }) {
      if (user) {
        // Credentials login
        token.accessToken = user.token || token.accessToken;
        token.email = user.email || token.email;
        token.firstName = user.firstName || token.firstName;
        token.role = user.role || token.role;
      }

      if (account?.provider === "google" && !token.accessToken) {
        // Exchange Google access token for backend token
        const response = await fetch(`${process.env.BASE_URL}/api/auth/login-google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: account.access_token }),
        });
        
        const data = await response.json();
        if (response.ok && data?.token) {
          token.accessToken = data.token;
          token.email = user?.email || token.email;
          token.firstName = user?.name || token.firstName;
          token.role = user.role || token.role;
        } else {
          throw new Error(data?.detail || "Google login failed");
        }
      }

      return token;
    },

    // Called when client calls useSession()
    async session({ session, token }) {
      session.user = {
        ...session.user,
        token: token.accessToken,
        email: token.email,
        firstName: token.firstName,
        role: token.role || "student",  //Added role to the session
      };
      return session;
    },
  },
  pages: {
    signIn: "/authenticator",
    error: "/login",
  },
  trustHost: true,
});
