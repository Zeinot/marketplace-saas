import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

function parseConnectionUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port || "5432"),
    database: parsed.pathname.slice(1),
    user: parsed.username,
    password: parsed.password,
  };
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool(parseConnectionUrl(dbUrl));

export const db = drizzle(pool, { schema });
