import { assessWritingGemini } from "@/src/lib/assess-writing-gemini";
import { getPrompt } from "@/src/lib/get-prompt";
import {
  getLatestPendingAssessment,
  saveAssessment,
} from "@/src/lib/supabase/assessments.service";
import { getSingleWriting } from "@/src/lib/supabase/writings.service";
import { NextResponse } from "next/server";

export async function GET() {
  const initializedAsessment = await getLatestPendingAssessment();

  if (!initializedAsessment) {
    return NextResponse.json({ message: "No pending assessment" });
  }

  const savedWriting = await getSingleWriting(initializedAsessment.writing_id!);

  try {
    const prompt = getPrompt({
      question: savedWriting.question!,
      response: savedWriting.response!,
      type: savedWriting.type as
        | "task_2"
        | "task_1_general"
        | "task_1_academic",
      hasImage: !!savedWriting.question_image,
    });

    const assessment = await assessWritingGemini({
      prompt,
      image: savedWriting.question_image!,
    });

    await saveAssessment(
      {
        status: "completed",
        writing_id: savedWriting?.writing_id,
        text: assessment,
        assessment_id: initializedAsessment?.assessment_id,
      },
      process.env.NEXT_PUBLIC_MODEL_NAME!
    );
  } catch (error) {
    await saveAssessment(
      {
        status: "failed",
        writing_id: savedWriting?.writing_id,
        text: error instanceof Error ? error.message : "Unknown error occurred",
        assessment_id: initializedAsessment?.assessment_id,
      },
      process.env.NEXT_PUBLIC_MODEL_NAME!
    );

    console.error("Assessment failed:", {
      error,
      writingId: savedWriting?.writing_id,
    });

    return NextResponse.json({ message: "Assessment failed" });
  }

  return NextResponse.json({ message: "Job processed" });
}
