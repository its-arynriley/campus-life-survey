import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/lib/env";

const globalForDb = globalThis as unknown as { pool?: Pool };

export const createDb = () => {
  if (!env.DATABASE_URL) {
    return null;
  }

  const pool = globalForDb.pool ?? new Pool({ connectionString: env.DATABASE_URL });

  if (env.NODE_ENV !== "production") {
    globalForDb.pool = pool;
  }

  return drizzle(pool);
};

export const db = createDb();
export { pool };

const pool = globalForDb.pool;

export { pool as postgresPool };
