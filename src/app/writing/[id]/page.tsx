"use client";

import { getSingleWritingSelfOrAdmin } from "@/src/lib/supabase/writings.service";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { WritingWritingViewWithAssessments } from "../components/writing-view-with-assessments";
import { Writing } from "@/src/lib/supabase/types";

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const { data: writing, isLoading } = useQuery({
    queryKey: ["writing", id],
    queryFn: () => getSingleWritingSelfOrAdmin(id),
  });

  if (!id || isLoading) return <></>;

  return (
    <span className="flex flex-col gap-2">
      <WritingWritingViewWithAssessments writing={writing as Writing} />
    </span>
  );
}
