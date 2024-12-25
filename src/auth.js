import Credentials from "next-auth/providers/credentials";
import NextAuth, { AuthError } from "next-auth";
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
      authorize: async (credentials) => {
        const credentialsLogInInfo = {
          email: credentials?.email,
          otp: credentials?.otp,
        };

        try {
          const res = await fetch(
            `${process.env.BASE_URL}/auth/login-verify-otp`,
            {
              method: "POST",
              body: JSON.stringify(credentialsLogInInfo),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const json = await res.json();

          if (!res.ok) {
            throw new customError(json);
          }

          return json;
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
          prompt: "consent",
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

      if (account?.provider == "google") {
        // console.log(account, "account de google");
        // console.log(token, "este token");
        // console.log(user, "este user");
        // console.log("entro al google provider");

        const response = await fetch(
          `${process.env.BASE_URL}/auth/login-google`,
          {
            method: "POST",
            body: JSON.stringify({ access_token: account.access_token }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        // console.log(data, 'data de google')

        if (response.ok && data?.token) {
          // console.log("entro en if")
          token.token = data.token;
        } else {
          // console.log("entro en else")
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

      return session;
    },
  },
  pages: {
    signIn: "/authenticator",
    error: "/login",
  },
  trustHost: true,
});
