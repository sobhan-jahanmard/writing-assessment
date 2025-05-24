import { GoogleGenerativeAI, type Part } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function assessWritingGemini({
  prompt,
  image,
  imageType,
}: {
  prompt: string;
  image?: Base64URLString;
  imageType?: File["type"];
}) {
  try {
    const contents: Part[] = [{ text: prompt }];

    if (image && imageType) {
      // Remove the data URL prefix if present
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      contents.push({
        inlineData: {
          mimeType: imageType,
          data: base64Data,
        },
      });
    }

    const result = await model.generateContent(contents);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error in Gemini assessment:", error);
    throw new Error("Failed to generate assessment with Gemini");
  }
}
