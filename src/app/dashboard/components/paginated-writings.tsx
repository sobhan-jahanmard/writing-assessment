"use client";

import { getWritingsWithLatestAssessment } from "@/src/lib/supabase/writings.service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/src/components/ui/button";
import { Divider } from "@/src/components/ui/divider";
import { useState } from "react";
import { WritingItem } from "./writing-item";
import { WritingWithLatestAssessment } from "@/src/lib/supabase/types";

interface PaginatedWritingsProps {
  userId: string;
}
const pageSize = 10;

export function PaginatedWritings({ userId }: PaginatedWritingsProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["getWritingsWithLatestAssessment", userId, page],
    queryFn: () => getWritingsWithLatestAssessment(userId, page, pageSize),
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (!data?.data?.length) return <div>هیچ رایتینگی یافت نشد</div>;

  const totalPages = Math.ceil((data.totalCount || 0) / pageSize);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">رایتینگ‌های شما</h2>
      <Divider />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                شناسه
              </th>
              <th scope="col" className="px-6 py-3">
                نوع
              </th>
              <th scope="col" className="px-6 py-3">
                سوال
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ ایجاد
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت ارزیابی
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data.map(
              (writingWithLatestAssessment: WritingWithLatestAssessment) => (
                <WritingItem
                  key={writingWithLatestAssessment?.writing_id}
                  writingWithLatestAssessment={writingWithLatestAssessment}
                />
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          قبلی
        </Button>
        <span className="py-2 px-4">
          صفحه {page} از {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
