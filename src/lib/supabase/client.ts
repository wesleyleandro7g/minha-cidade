"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env, isSupabaseConfigured } from "@/lib/env";

/**
 * Browser Supabase client. Returns null when Supabase isn't configured so the
 * UI can gracefully fall back to seed/demo behavior during local development.
 */
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(env.supabaseUrl, env.supabasePublishableKey);
}
