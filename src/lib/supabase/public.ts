import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Public (anon-key) Supabase client for Server Components reading published
 * content. Subject to Row Level Security — can only ever see rows the
 * "published articles are public" policy allows.
 */
export function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}
