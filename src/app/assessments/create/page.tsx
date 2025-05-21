"use client";

import { useForm } from "react-hook-form";
import { Button } from "@ui/button";
import { Textarea } from "@ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { assessWriting } from "@/src/lib/server";
import { createWorker } from "tesseract.js";
import { fileToBase64 } from "@/src/lib/file-to-base64";

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
  response: z.string().min(1, "Response is required"),
  type: z.enum(["task_2", "task_1_general", "task_1_academic"]),
  image: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateAssessment() {
  const [assessment, setAssessment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "task_2",
      question: "",
      response: "",
      image: undefined,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await assessWriting({
        question: data.question,
        response: data.response,
        type: data.type,
        model: "gemini",
        image: data.image ? await fileToBase64(data.image) : undefined,
        imageType: data.image?.type,
      });
      return res?.assessment;
    },
  });

  const onSubmit = async (data: FormData) => {
    const assessment = await mutateAsync(data);
    setAssessment(assessment);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const worker = await createWorker("eng", 1, {
        logger: (m) => console.log(m),
      });
      const result = await worker.recognize(file);
      await worker.terminate();
      setValue("response", result.data.text);
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create Writing Assessment</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="ltr">
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Task Type
          </label>
          <Select
            onValueChange={(value: FormData["type"]) => setValue("type", value)}
            defaultValue="task_2"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select task type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="task_2">Task 2 (Essay)</SelectItem>
              <SelectItem value="task_1_general">
                Task 1 (General Training)
              </SelectItem>
              <SelectItem value="task_1_academic">Task 1 (Academic)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="question" className="text-sm font-medium">
            Question
          </label>
          <Textarea
            {...register("question")}
            placeholder="Enter the writing question..."
            className="min-h-[100px]"
          />
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="response" className="text-sm font-medium">
            Response
          </label>
          <div className="space-y-2">
            <Textarea
              {...register("response")}
              placeholder="Enter your writing response..."
              className="min-h-[200px]"
            />
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isProcessing}
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 cursor-pointer"
              >
                {isProcessing ? "Processing..." : "Upload Image"}
              </label>
              {isProcessing && (
                <span className="text-sm text-muted-foreground">
                  Extracting text from image...
                </span>
              )}
            </div>
          </div>
          {errors.response && (
            <p className="text-red-500 text-sm">{errors.response.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">
            Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("image", file);
              }
            }}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isPending} variant="outline">
          {isPending ? "Submitting..." : "Submit for Assessment"}
        </Button>
      </form>
      {assessment && (
        <div className="mt-6" dir="ltr">
          <h2 className="text-lg font-bold mb-2">Assessment Result</h2>
          <pre className="bg-gray-100 text-black p-4 rounded-md whitespace-pre-wrap">
            {assessment}
          </pre>
        </div>
      )}
    </div>
  );
}
