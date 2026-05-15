import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "guest",
      credentials: {},
      async authorize() {
        // Create a guest user with a random name
        const randomSuffix = Math.random().toString(36).substring(2, 6);
        const guestUser = await prisma.user.create({
          data: {
            name: `Estudiante-${randomSuffix}`,
            email: `guest-${Date.now()}@academytech.guest`,
            role: "student",
          },
        });
        return guestUser;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Auto-assign teacher role if email matches ADMIN_EMAIL
      if (account?.provider === "google" && user.email) {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail && user.email === adminEmail) {
          // Check if user exists and update role
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          if (existingUser && existingUser.role !== "admin") {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { role: "admin" },
            });
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      // Always refresh role from DB for admin users to catch role changes
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}
