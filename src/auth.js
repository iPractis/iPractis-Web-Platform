import NextAuth, { AuthError, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import "next-auth/jwt";

/*
declare module "next-auth" {
	interface Session {
		user: {
			access_token: string;
		} & DefaultSession["user"];
	}

	interface User {
		access_token: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		access_token: string;
	}
}

class customError extends AuthError {
	constructor(message) {
		super();
		this.message = message;
	}
}
*/

// 2700940340074938
//clave secreta 7493169cff3baf4356989053155a8bad
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
          const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
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
            const errorMessage = user.message;
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
          // prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

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
        // console.log("entonces estoy aqui");
        const response = await fetch(`http://127.0.0.1:8000/api/users/login`, {
          method: "POST",
          body: JSON.stringify({ email: user.email, password: "45" }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        // console.log(data, "respuesta de back");

        if (response.ok && data?.access_token) {
          token.access_token = data.access_token;
        } else {
          // console.log("paso aqui,,,", data, "aui aqui");
          // console.log(data.detail);
          throw new Error(data.detail);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.token = token.token;
        session.user.firstName = token.firstName;
        // session.user.role = token.role;
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
  // debug:true
});
