"use server";

import { getPrompt } from "./get-prompt";
import { assessWritingGemini } from "./assess-writing-gemini";
import path from "path";
import fs from "fs";

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

    return assessment;
  } catch (error: unknown) {
    console.error("Error processing request:", error);
    throw new Error("Invalid request body");
  }
}
