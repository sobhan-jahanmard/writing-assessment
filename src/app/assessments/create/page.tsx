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
import { assessWriting } from "@/src/lib/assess-writing.server";
import { createWorker } from "tesseract.js";
import { fileToBase64 } from "@/src/lib/file-to-base64";
import { getWordsCount } from "@/src/lib/get-count-words";
import { Divider } from "@/src/components/ui/divider";

const formSchema = z
  .object({
    question: z
      .string()
      .min(1, "سوال الزامی است")
      .max(1000, "حداکثر تعداد کاراکتر ۱۰۰۰ است"),
    response: z.string().min(1, "پاسخ الزامی است"),
    type: z.enum(["task_2", "task_1_general", "task_1_academic"]),
    image: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
        message: "حجم تصویر باید کمتر از ۲ مگابایت باشد",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.type === "task_1_academic" && !data.image) {
      ctx.addIssue({
        path: ["image"],
        code: z.ZodIssueCode.custom,
        message: "تصویر برای تسک ۱ آکادمیک الزامی است",
      });
    }
  })
  .superRefine((data, ctx) => {
    const maxWords = data.type === "task_2" ? 500 : 300;
    const wordCount = getWordsCount(data.response);
    if (wordCount > maxWords) {
      ctx.addIssue({
        path: ["response"],
        code: z.ZodIssueCode.too_big,
        message: `پاسخ باید حداکثر ${maxWords} کلمه برای ${
          data.type === "task_2" ? "تسک ۲" : "تسک ۱"
        } باشد`,
        maximum: maxWords,
        type: "string",
        inclusive: true,
      });
    }
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
    watch,
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
        image: data.image ? await fileToBase64(data.image) : undefined,
        imageType: data.image?.type,
      });
      return res;
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

  const writingType = watch("type");

  return (
    <div className="flex flex-col items-center w-full py-10">
      <span className="max-w-[800px] flex flex-col w-full">
        <h1 className="text-2xl font-extrabold px-3">تصحیح رایتینگ</h1>
        <Divider className="mt-4 mb-10" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 px-3"
          dir="rtl"
        >
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              نوع رایتینگ
            </label>
            <Select
              onValueChange={(value: FormData["type"]) =>
                setValue("type", value)
              }
              defaultValue="task_2"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="task_2">Task 2 </SelectItem>
                <SelectItem value="task_1_general">
                  Task 1 (General Training)
                </SelectItem>
                <SelectItem value="task_1_academic">
                  Task 1 (Academic)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">
              سوال رایتینگ
            </label>
            <Textarea
              {...register("question")}
              className="min-h-[150px]"
              dir="ltr"
            />
            {errors.question && (
              <p className="text-red-500 text-sm">{errors.question.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              عکس نمودار سوال{" "}
              {writingType !== "task_1_academic" ? "(‌اختیاری )" : ""}
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

          <div className="space-y-2">
            <label htmlFor="response" className="text-sm font-medium">
              جواب رایتینگ
            </label>
            <div className="space-y-2">
              <Textarea
                {...register("response")}
                className="min-h-[300px]"
                dir="ltr"
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
                  {isProcessing ? "..." : "عکس جواب خود را بارگذاری کنید"}
                </label>
                {isProcessing && (
                  <span className="text-sm text-muted-foreground">
                    در حال تبدیل عکس به متن...
                  </span>
                )}
              </div>
            </div>
            {errors.response && (
              <p className="text-red-500 text-sm">{errors.response.message}</p>
            )}
          </div>

          <span className="flex justify-center">
            <Button type="submit" disabled={isPending} className="px-7">
              {isPending ? "در حال بارگذاری..." : "فرستادن درخواست"}
            </Button>
          </span>
        </form>
        {assessment && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">نتیجه ارزیابی</h2>
            <pre
              dir="ltr"
              className="bg-gray-100 text-black p-4 rounded-md whitespace-pre-wrap"
            >
              {assessment}
            </pre>
          </div>
        )}
      </span>
    </div>
  );
}
