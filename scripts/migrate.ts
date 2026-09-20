import { config } from "dotenv";
import { migrate } from "drizzle-orm/node-postgres/migrator";

config({ path: ".env.local" });
config({ path: ".env" });

async function main() {
  // Load environment files before importing the database module, whose
  // validation intentionally fails when DATABASE_URL is missing.
  const { db } = await import("../src/db");

  if (!db) {
    console.log("Skipping database migrations because DATABASE_URL is not configured.");
    return;
  }

  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Database migrations applied.");
}

main().catch((error) => {
  console.error("Database migration failed.", error);
  process.exitCode = 1;
});
