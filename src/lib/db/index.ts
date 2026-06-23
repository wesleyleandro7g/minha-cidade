import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env, isDatabaseConfigured } from "@/lib/env";
import { schema } from "./schema";

/**
 * Drizzle client over postgres-js. Returns null when DATABASE_URL is absent so
 * the app can run on seed data during local development.
 */
function createDb() {
  if (!isDatabaseConfigured) return null;
  const client = postgres(env.databaseUrl, { prepare: false });
  return drizzle(client, { schema });
}

export const db = createDb();
export { schema };
