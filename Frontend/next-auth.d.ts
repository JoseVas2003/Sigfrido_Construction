// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // Add the admin property as optional
      admin?: boolean;
    } & DefaultSession["user"];
  }
}
