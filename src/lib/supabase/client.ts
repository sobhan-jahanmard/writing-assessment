import { Database } from "@/database.types";
import { createBrowserClient as CBC } from "@supabase/ssr";

export function createBrowserClient() {
  return CBC<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
