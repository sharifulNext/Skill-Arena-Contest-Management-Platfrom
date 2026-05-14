import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import { User } from "@/model/User";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [

    // GOOGLE
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // CREDENTIALS
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {

    // GOOGLE USER SAVE TO DB
    async signIn({ user, account }) {

      if (account?.provider === "google") {

        await connectDB();

        const existingUser = await User.findOne({
          email: user.email,
        });

        // USER NOT EXISTS
        if (!existingUser) {

          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "USER",
          });
        }
      }

      return true;
    },

    // JWT
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }

      // DATABASE থেকে role আনা
      await connectDB();

      const dbUser = await User.findOne({
        email: token.email,
      });

      if (dbUser) {
        token.role = dbUser.role;
        token.id = dbUser._id.toString();
      }

      return token;
    },

    // SESSION
    async session({ session, token }) {

      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});