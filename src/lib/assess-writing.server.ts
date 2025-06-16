"use server";

import { b64toBlob } from "./b64-to-blob";
import { uploadFile } from "./supabase/storage.service";
import { saveWriting } from "./supabase/writings.service";
import { saveAssessment } from "./supabase/assessments.service";
import { ensureUserExists, getUserOnServer } from "./supabase/user.service";
import { sleep } from "./sleep";

export type Body = {
  question: string;
  response: string;
  type: "task_2" | "task_1_general" | "task_1_academic";
  image?: Base64URLString;
  imageType?: File["type"];
};

export async function assessWriting(body: Body) {
  try {
    if (!body.question || !body.response || !body.type) {
      throw new Error("Question, response, type and model are required");
    }

    const requestUser = await getUserOnServer(true);

    const user = await ensureUserExists(requestUser?.id);

    let uploadedFile: string | null = null;
    if (body.image) {
      uploadedFile = await uploadFile(b64toBlob(body.image!), body.imageType!);
    }

    const savedWriting = await saveWriting({
      question: body.question,
      response: body.response,
      type: body.type,
      question_image: uploadedFile,
      user_id: user.user_id,
    });

    const initializedAsessment = await saveAssessment(
      {
        status: "pending",
        writing_id: savedWriting?.writing_id,
        text: null,
      },
      process.env.NEXT_PUBLIC_MODEL_NAME!
    );

    await sleep(1000);

    return {
      success: true,
      writingId: savedWriting.writing_id,
      assessmentId: initializedAsessment?.assessment_id,
    };
  } catch (error: unknown) {
    console.error("Error processing request:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "An unexpected error occurred while processing the request"
    );
  }
}
