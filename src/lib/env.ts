/**
 * Centralized environment access. The public area is designed to work with
 * seed data when Supabase is not configured, so most reads are optional and
 * guarded by `isSupabaseConfigured`.
 */
export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  defaultCity: process.env.NEXT_PUBLIC_DEFAULT_CITY ?? "salinas",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabasePublishableKey:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "",
};

export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabasePublishableKey,
);

export const isDatabaseConfigured = Boolean(env.databaseUrl);

export const isMapboxConfigured = Boolean(env.mapboxToken);
