import { Pool } from "pg";

export async function isDatabaseAvailable(connectionString?: string): Promise<boolean> {
  const pool = new Pool({
    connectionString: connectionString || process.env.DATABASE_URL_TEST || process.env.DATABASE_URL,
    connectionTimeoutMillis: 2000,
  });

  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    await pool.end();
    return true;
  } catch {
    await pool.end();
    return false;
  }
}
