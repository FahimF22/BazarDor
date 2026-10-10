import { betterAuth } from "better-auth";
import { DatabaseSync } from "node:sqlite";

/**
 * BetterAuth with Node.js built-in SQLite (no native compile needed)
 * Works on Windows without Visual Studio C++ tools.
 */
export const auth = betterAuth({
  database: new DatabaseSync("bazardor.db"),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,
  },
});

export type Session = typeof auth.$Infer.Session;