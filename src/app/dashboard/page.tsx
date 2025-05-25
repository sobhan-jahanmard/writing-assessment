import { createClient } from "@/src/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return <p>Hello {data?.user?.email}</p>;
}
