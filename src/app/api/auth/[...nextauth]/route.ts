import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const TemporaryUser: any[] = [];

const handler = NextAuth({
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.OAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_OAUTH2_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_OAUTH2_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials: any, req): Promise<any> {
        if (credentials) {
          const user = await prisma.users.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (
            user &&
            bcrypt.compareSync(credentials?.password, user?.password ?? "")
          ) {
            TemporaryUser.push(user);
            return user;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Modifies the default session to better fit our application's user structure.
    async session({ session, user, token }) {
      const userTemp = TemporaryUser[0];

      if (userTemp?.hasOwnProperty("id")) {
        const currentUserSession = {
          expires: session.expires,
          user: {
            name: userTemp.first_name + " " + userTemp.last_name,
            ...userTemp,
            password: undefined,
          },
        };
        if (
          session.user?.name === undefined &&
          session.user?.image === undefined
        ) {
          return currentUserSession;
        } else {
          return session;
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
