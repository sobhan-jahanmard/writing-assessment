import { Assessment } from "@/src/lib/supabase/types";

export const AssessmentView = ({ assessment }: { assessment: Assessment }) => {
  console.log("dadadaman2", assessment);
  return (
    <div className="mt-6">
      <pre
        dir="ltr"
        className="bg-gray-100 text-black p-4 rounded-md whitespace-pre-wrap"
      >
        {assessment?.text}
      </pre>
    </div>
  );
};
