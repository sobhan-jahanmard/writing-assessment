"use server";

import { getPrompt } from "./get-prompt";
import { assessWritingGemini } from "./assess-writing-gemini";
import path from "path";
import fs from "fs";
import { b64toBlob } from "./b64-to-blob";
import { uploadFile } from "./supabase/storage.service";
import { saveWriting } from "./supabase/writings.service";
import { saveAssessment } from "./supabase/assessments.service";
import { ensureUserExists, getUserOnServer } from "./supabase/user.service";

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

    const prompt = getPrompt({
      question: body.question,
      response: body.response,
      type: body.type,
      hasImage: !!body.image,
    });

    const assessment = await assessWritingGemini({
      prompt,
      image: body.image,
      imageType: body.imageType,
    });

    const savedAssessment = await saveAssessment(
      {
        status: "completed",
        writing_id: savedWriting?.writing_id,
        text: assessment,
        assessment_id: initializedAsessment?.assessment_id,
      },
      process.env.NEXT_PUBLIC_MODEL_NAME!
    );

    console.log("assessment_id", savedAssessment?.assessment_id);

    const sentDataFilePath = path.join(process.cwd(), "sent-data.txt");
    const assessmentFilePath = path.join(process.cwd(), "assessment.txt");
    fs.writeFileSync(
      sentDataFilePath,
      JSON.stringify(
        {
          question: body.question,
          response: body.response,
          type: body.type,
          hasImage: !!body.image,
        },
        null,
        2
      )
    );
    fs.writeFileSync(assessmentFilePath, assessment);

    return savedAssessment;
  } catch (error: unknown) {
    console.error("Error processing request:", error);
    throw new Error("Invalid request body");
  }
}
