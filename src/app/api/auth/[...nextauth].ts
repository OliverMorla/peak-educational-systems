import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";

// const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_OAUTH2_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_OAUTH2_CLIENT_SECRET}`,
    }),
    FacebookProvider({
      clientId: `${process.env.FACEBOOK_OAUTH2_CLIENT_ID}`,
      clientSecret: `${process.env.FACEBOOK_OAUTH2_CLIENT_SECRET}`,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = undefined;
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
