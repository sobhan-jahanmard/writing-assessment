"use client";

import { getSingleWriting } from "@/src/lib/supabase/writings.service";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { WritingWritingViewWithAssessments } from "../components/writing-view-with-assessments";
import { Writing } from "@/src/lib/supabase/types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const writing = await getSingleWriting(params.id);

  return {
    title: `رایتینگ ${writing?.question || params.id} | ارزیابی رایتینگ آیلتس`,
    description: `مشاهده و ارزیابی رایتینگ آیلتس ${
      writing?.question || params.id
    }`,
  };
}

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const { data: writing, isLoading } = useQuery({
    queryKey: ["writing", id],
    queryFn: () => getSingleWriting(id),
  });

  if (!id || isLoading) return <></>;

  return (
    <span className="flex flex-col gap-2">
      <WritingWritingViewWithAssessments writing={writing as Writing} />
    </span>
  );
}
