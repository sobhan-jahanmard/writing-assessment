import { createClient } from "@/src/lib/supabase/server";
import { PaginatedWritings } from "./components/paginated-writings";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data?.user?.id) {
    return <p>لطفا برای مشاهده رایتینگ‌های خود وارد شوید</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">داشبورد</h1>
      <PaginatedWritings userId={data.user.id} />
    </div>
  );
}
