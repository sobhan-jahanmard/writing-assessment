"use server";

import { getPrompt } from "./get-prompt";
import { assessWritingOpenAi } from "./assess-writing-openai";
import { assessWritingGemini } from "./assess-writing-gemini";
import path from "path";
import fs from "fs";

export type Body = {
  question: string;
  response: string;
  type: "task_2" | "task_1_general" | "task_1_academic";
  model: "openai" | "gemini";
  image?: Base64URLString;
  imageType?: File["type"];
};

const handler: Record<Body["model"], typeof assessWritingGemini> = {
  openai: assessWritingOpenAi,
  gemini: assessWritingGemini,
};

export async function assessWriting(body: Body) {
  try {
    if (!body.question || !body.response || !body.type || !body.model) {
      throw new Error("Question, response, type and model are required");
    }

    const prompt = getPrompt({
      question: body.question,
      response: body.response,
      type: body.type,
      hasImage: !!body.image,
    });

    const assessment = await handler[body.model]({
      prompt,
      image: body.image,
      imageType: body.imageType,
    });

    const filePath = path.join(process.cwd(), "assessment.txt");
    fs.writeFileSync(filePath, assessment);

    return {
      assessment,
      model: body.model || "openai",
    };
  } catch (error: unknown) {
    console.error("Error processing request:", error);
    throw new Error("Invalid request body");
  }
}
