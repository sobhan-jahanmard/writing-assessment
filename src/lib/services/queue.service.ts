import { Queue, Worker, Job as BullJob } from "bullmq";
import { assessWritingGemini } from "../assess-writing-gemini";
import { saveAssessment } from "../supabase/assessments.service";
import { Body } from "../assess-writing.server";
import { getPrompt } from "../get-prompt";
import { Assessment } from "../supabase/types";
import { saveWriting } from "../supabase/writings.service";

// Types
export type JobData = {
  body: Body;
  savedWriting: Awaited<ReturnType<typeof saveWriting>>;
  initializedAsessment: Assessment;
};

// Queue configuration
const getQueueConfig = () => {
  const requiredEnvVars = {
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    NEXT_PUBLIC_MODEL_NAME: process.env.NEXT_PUBLIC_MODEL_NAME,
  } as const;

  // Validate environment variables
  if (!Object.values(requiredEnvVars).every(Boolean)) {
    throw new Error("Missing required environment variables");
  }

  // Type assertion since we've validated the values
  const validatedEnvVars = requiredEnvVars as {
    [K in keyof typeof requiredEnvVars]: string;
  };

  return {
    connection: {
      host: new URL(validatedEnvVars.REDIS_URL).hostname,
      port: 6379,
      password: validatedEnvVars.REDIS_PASSWORD,
      maxRetriesPerRequest: 10,
      enableReadyCheck: true,
      tls: {},
      retryStrategy: (times: number) => Math.min(times * 100, 5000),
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential" as const,
        delay: 1000,
      },
    },
    modelName: validatedEnvVars.NEXT_PUBLIC_MODEL_NAME,
  };
};

// Initialize queue
const config = getQueueConfig();
export const queue = new Queue("assessments", {
  connection: config.connection,
  defaultJobOptions: config.defaultJobOptions,
});

// Initialize worker
export const worker = new Worker(
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
        config.modelName
      );
    } catch (error) {
      await saveAssessment(
        {
          status: "failed",
          writing_id: savedWriting?.writing_id,
          text:
            error instanceof Error ? error.message : "Unknown error occurred",
          assessment_id: initializedAsessment?.assessment_id,
        },
        config.modelName
      );

      console.error("Assessment failed:", {
        jobId: job.id,
        error,
        writingId: savedWriting?.writing_id,
      });

      throw error;
    }
  },
  { connection: config.connection }
);

// Event handlers
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});

// Queue operations
export const addToQueue = async (data: JobData) => {
  return queue.add("assessments", data);
};

// Cleanup
export const cleanup = async () => {
  await worker.close();
  await queue.close();
};
