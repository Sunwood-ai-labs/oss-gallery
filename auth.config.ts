import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { 
          label: "メールアドレス", 
          type: "email",
          placeholder: "example@example.com"
        },
        password: { 
          label: "パスワード", 
          type: "password",
          placeholder: "********"
        }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("メールアドレスとパスワードが必要です");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!user || !user.password) {
            throw new Error("ユーザーが見つかりません");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("パスワードが正しくありません");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "認証エラーが発生しました");
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;
