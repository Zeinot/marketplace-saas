import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      // In production, use Resend here
      // Password reset URL generated (logged in dev only)
    },
  },
  socialProviders: {},
});

export type Session = typeof auth.$Infer.Session;
