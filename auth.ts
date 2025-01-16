import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { api } from "~/trpc/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      const existingUser = await api.user.getUniqueUser(String(profile?.sub));

      if (!existingUser) {
        const googleUser = api.user.createUser({
          name: String(user?.name),
          email: String(user?.email),
          image: String(user?.image),
          sub: String(profile?.sub),
        });
      }

      return true;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
