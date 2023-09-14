import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

//@ts-ignore
const TemporaryUser = [];

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
            TemporaryUser.push({
              //@ts-ignore
              ...user,
            });
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
      //@ts-ignore
      let userTemp = TemporaryUser[0];
      if (userTemp.hasOwnProperty("id")) {
        const currentUserSession = {
          expires: session.expires,
          user: {
            name: userTemp.first_name + " " + userTemp.last_name,
            ...userTemp,
            password: undefined,
          },
        };
        
        // Consolidate first and last name for a more user-friendly display.
        // console.log(token);
        // console.log(userTemp);
        // console.log(currentUserSession);

        if (
          (userTemp?.first_name !== undefined ||
            currentUserSession?.user.first_name !== undefined) &&
          session?.user?.name === undefined
        ) {
          // let name = userTemp?.first_name + " " + userTemp?.last_name;
          // console.log(name);
          // const sessionTemp = {
          //   expires: session.expires,
          //   user: {
          //     ...userTemp,
          //     name: name,
          //     password: undefined,
          //   },
          // };
          return currentUserSession;
        }
      }
      userTemp = {};
      return session;
    },
  },
});

export { handler as GET, handler as POST };
