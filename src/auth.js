import NextAuth, { AuthError, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import "next-auth/jwt";

class customError extends AuthError {
  constructor(message) {
    super();
    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        console.log(credentials, "authorize");
        try {
          const response = await fetch(`${process.env.BASE_URL}/auth/login-verify-otp`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const user = await response.json();
          console.log(user, "user autthorize");
          console.log(user, "desde auth");
          if (!response.ok) {
            console.log("en el if del error");
            const errorMessage = user;
            throw new customError(errorMessage);
          }

          return user;
        } catch (error) {
          throw error;
        }
      },
    }),

    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider == "credentials") {
        token.token = user.token;
        token.firstName = user.firstName;
      }

      console.log(token, "el token callback");
      console.log(user, "el user callback");
      console.log(account, "el account callback");

      if (account?.provider == "google") {
        const response = await fetch(`http://127.0.0.1:8000/api/users/login`, {
          method: "POST",
          body: JSON.stringify({ email: user.email, password: "45" }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok && data?.access_token) {
          token.access_token = data.access_token;
        } else {
          throw new Error(data.detail);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.token = token.token;
        session.user.firstName = token.firstName;
      }
      console.log(session, "session de authjs");
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
});
