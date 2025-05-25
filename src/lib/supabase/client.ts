import { createBrowserClient as CBC } from "@supabase/ssr";

export function createBrowserClient() {
  return CBC(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
