import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    encode: async ({ secret, token }) => {
      const encodedToken = jwt.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jwt.verify(token!, secret) as JWT;
      return decodedToken;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      try {
        const data = (await getUser(email)) as { user: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };
        return newSession;
      } catch (error:any) {
        console.error("callBacks session", error.message);
      }
      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      // AdaptedUser would mean the user is authenticated through next-auth
      // else it would mean the user is authenticated through other authentication provider

      try {
        const userExists = (await getUser(user?.email as string)) as {
          user: UserProfile;
        };
        if (!userExists?.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }
        return true;
      } catch (error: any) {
        console.error(error.message);
        return false;
      }
    },
  },
};
export async function getCurrentUser() {
  try {
    const session = (await getServerSession(authOptions)) as SessionInterface;
    return session;
  } catch (error:any) {
    console.error(error.message);
  }
}
