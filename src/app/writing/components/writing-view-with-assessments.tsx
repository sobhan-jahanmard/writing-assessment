"use client";

import { getAssessmentsOfWriting } from "@/src/lib/supabase/assessments.service";
import { AssessmentStatus, Writing } from "@/src/lib/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { AssessmentView } from "./assessment-view";
import { WritingWritingView } from "./writing-view";
import { Divider } from "@/src/components/ui/divider";

export function WritingWritingViewWithAssessments({
  writing,
}: {
  writing: Writing;
}) {
  const { data: assessments, isLoading } = useQuery({
    queryKey: ["assessments", writing?.writing_id],
    queryFn: () => getAssessmentsOfWriting(writing?.writing_id || ""),
    enabled: !!writing?.writing_id,
  });
  if (isLoading || !writing) return <></>;

  const filteredAssessments = assessments?.filter(
    (assessment) => (assessment.status as AssessmentStatus) === "completed"
  );

  return (
    <span className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold">اطلاعات رایتینگ</h1>
      <Divider className="mt-4 mb-10" />
      <WritingWritingView writing={writing} />
      <h1 className="text-2xl font-extrabold mt-12">نتیجه ارزیابی</h1>
      <Divider className="my-4" />
      {filteredAssessments?.map((assessment) => {
        return (
          <AssessmentView
            key={assessment.assessment_id}
            assessment={assessment}
          />
        );
      })}
    </span>
  );
}
