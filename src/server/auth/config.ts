import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import Google from "next-auth/providers/google";

import { db } from "~/server/db";

// From server/api/auth/index.ts

import NextAuth from "next-auth";
import { cache } from "react";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Google,
    // DiscordProvider,
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: async ({ session, user, token }) =>
      // {
      //   if (token.sub && session.user) {
      //     session.user.id = token.sub;
      //   }
      //   if (session.user) {
      //     session.user.name = token.name;
      //     session.user.email = token.email as string;
      //     // session.user.role = token.role;
      //   }
      //   return session;
      // },
      // }
      ({
        ...session,
        user: {
          ...session.user,
          // id: user.id,
          id: token.sub,
        },
      }),
  },
} satisfies NextAuthConfig;

// From server/api/auth/index.ts

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
