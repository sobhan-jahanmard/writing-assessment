import { createClient } from "@/src/lib/supabase/server";
import { PaginatedWritings } from "./components/paginated-writings";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data?.user?.id) {
    return <p>لطفا برای مشاهده رایتینگ‌های خود وارد شوید</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <span className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8">داشبورد</h1>
        <Link href={"/writing/create"}>
          <Button className="flex gap-2">
            ایجاد رایتینگ جدید <Plus height={20} width={20} />
          </Button>
        </Link>
      </span>
      <PaginatedWritings userId={data.user.id} />
    </div>
  );
}
