import "server-only";
import { Pool } from "pg";

/**
 * Waitlist stores personal data (NDPA), so DATABASE_URL must point at a Nigerian-hosted
 * Postgres in production. Local Postgres in development (see docker-compose.yml).
 */
let pool: Pool | undefined;
let ready: Promise<void> | undefined;

export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : undefined,
  });
  return pool;
}

export function ensureSchema() {
  ready ??= db()
    .query(
      `CREATE TABLE IF NOT EXISTS waitlist (
         id          BIGSERIAL PRIMARY KEY,
         first_name  TEXT NOT NULL,
         email       TEXT NOT NULL,
         phone       TEXT,
         consent_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
         created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
       );
       CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_key ON waitlist (lower(email));
       CREATE TABLE IF NOT EXISTS messages (
         id          BIGSERIAL PRIMARY KEY,
         kind        TEXT NOT NULL CHECK (kind IN ('contact','careers')),
         name        TEXT NOT NULL,
         email       TEXT NOT NULL,
         phone       TEXT,
         message     TEXT NOT NULL,
         consent_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
         created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
       );`,
    )
    .then(() => undefined);
  ready.catch(() => (ready = undefined));
  return ready;
}
