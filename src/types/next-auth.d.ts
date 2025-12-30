import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's access token. */
            token?: string
            firstName?: string
            role?: string
        } & DefaultSession["user"]
    }

    interface User {
        token?: string
        firstName?: string
        role?: string
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken?: string
        firstName?: string
        role?: string
    }
}
