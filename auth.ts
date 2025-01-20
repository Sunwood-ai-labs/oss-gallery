import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";

export type AuthUser = {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
};

declare module "next-auth" {
  interface User extends AuthUser {}
  
  interface Session {
    user: AuthUser & {
      id: string;
      email: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});

export const { auth, signIn, signOut } = handler;

export { handler as GET, handler as POST };
