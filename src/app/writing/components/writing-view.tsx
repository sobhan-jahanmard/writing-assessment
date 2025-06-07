"use client";

import { getWritingTypeLabels } from "@/src/lib/get-writing-type-labels";
import { Writing } from "@/src/lib/supabase/types";
import { useMemo } from "react";

export function WritingWritingView({ writing }: { writing: Writing }) {
  const response = useMemo(() => {
    return writing?.response?.replace(/\\n/g, "\n")?.replace(/\\\n/g, "\n");
  }, [writing?.response]);

  return (
    <span className="flex flex-col gap-4">
      <div className="space-y-2 flex flex-col">
        <label htmlFor="type" className="text-sm font-bold mb-2">
          نوع رایتینگ
        </label>
        {getWritingTypeLabels(writing?.type as string)}
      </div>

      <div className="space-y-2  flex flex-col">
        <label htmlFor="question" className="text-sm font-bold mb-2">
          سوال رایتینگ
        </label>
        <span dir="ltr">{writing?.question}</span>
      </div>

      {!!writing?.question_image && (
        <div className="space-y-2  flex flex-col">
          <label htmlFor="image" className="text-sm font-bold mb-2">
            عکس نمودار سوال
          </label>
          <img src={writing?.question_image as string} />
        </div>
      )}
      <div className="space-y-2  flex flex-col">
        <label htmlFor="response" className="text-sm font-bold mb-2">
          جواب رایتینگ
        </label>
        <span dir="ltr" className="whitespace-pre-wrap w-full">
          {response}
        </span>
      </div>
    </span>
  );
}
