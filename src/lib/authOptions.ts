import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

type UserTempType = {
  id?: number | null;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  date_of_birth?: Date | null;
  title?: string | null;
  emp_type?: string | null;
  emp_region?: string | null;
  child_grade_level?: string | null;
  school_type?: string | null;
  school_region?: string | null;
};

let userTemp: UserTempType = {};
export const authOptions: AuthOptions = {
  // secret: process.env.OAUTH_SECRET,
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
            userTemp = {
              ...user,
            };
            return user;
          }
        } else {
          return null;
        }
      },
    }),
  ],
};
