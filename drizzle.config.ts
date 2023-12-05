import type { Config } from "drizzle-kit";
 
export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: 'libsql://orca-thehi198.turso.io',
    authToken: process.env.TURSO_AUTH_TOKEN,
  }
} satisfies Config;