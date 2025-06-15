"use server";

import { Queue, Worker, Job as BullJob } from "bullmq";
import { assessWritingGemini } from "./assess-writing-gemini";
import { saveAssessment } from "./supabase/assessments.service";
import { Body } from "./assess-writing.server";
import { getPrompt } from "./get-prompt";
import { Assessment } from "./supabase/types";
import { saveWriting } from "./supabase/writings.service";

// Validate required environment variables
const requiredEnvVars = {
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  NEXT_PUBLIC_MODEL_NAME: process.env.NEXT_PUBLIC_MODEL_NAME,
} as const;

// Type guard to ensure all required env vars are present
const validateEnvVars = (
  vars: typeof requiredEnvVars
): vars is { [K in keyof typeof vars]: string } => {
  return Object.values(vars).every(Boolean);
};

if (!validateEnvVars(requiredEnvVars)) {
  throw new Error("Missing required environment variables");
}

// Create connection options for BullMQ with enhanced retry settings
const connectionOptions = {
  host: new URL(requiredEnvVars.REDIS_URL).hostname,
  port: 6379,
  password: requiredEnvVars.REDIS_PASSWORD,
  maxRetriesPerRequest: 10,
  enableReadyCheck: true,
  tls: {},
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 100, 5000);
    return delay;
  },
};

const queue = new Queue("assessments", {
  connection: connectionOptions,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
});

type JobData = {
  body: Body;
  savedWriting: Awaited<ReturnType<typeof saveWriting>>;
  initializedAsessment: Assessment;
};

const worker = new Worker(
  "assessments",
  async (job: BullJob<JobData>) => {
    const { body, savedWriting, initializedAsessment } = job.data;

    try {
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

      await saveAssessment(
        {
          status: "completed",
          writing_id: savedWriting?.writing_id,
          text: assessment,
          assessment_id: initializedAsessment?.assessment_id,
        },
        requiredEnvVars.NEXT_PUBLIC_MODEL_NAME
      );
    } catch (error) {
      // Update assessment status to failed
      await saveAssessment(
        {
          status: "failed",
          writing_id: savedWriting?.writing_id,
          text:
            error instanceof Error ? error.message : "Unknown error occurred",
          assessment_id: initializedAsessment?.assessment_id,
        },
        requiredEnvVars.NEXT_PUBLIC_MODEL_NAME
      );

      // Log error with job context
      console.error("Assessment failed:", {
        jobId: job.id,
        error,
        writingId: savedWriting?.writing_id,
      });

      throw error; // Re-throw to trigger retry mechanism
    }
  },
  {
    connection: connectionOptions,
  }
);

// Handle worker events
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});

// // Cleanup function
// export const cleanup = async () => {
//   await worker.close();
//   await queue.close();
// };

export const addToQueue = async ({
  body,
  savedWriting,
  initializedAsessment,
}: JobData) => {
  return queue.add("assessments", { body, savedWriting, initializedAsessment });
};
