import { Database } from "@/database.types";
import { getSingleWriting } from "./writings.service";
import { getAssessmentsOfWriting } from "./assessments.service";

export type SaveWritingDTO = Omit<
  Database["public"]["Tables"]["writings"]["Insert"],
  "writing_id" | "created_at" | "updated_at"
>;

export type SaveAssessmentDTO = Omit<
  Database["public"]["Tables"]["assessments"]["Insert"],
  "created_at" | "updated_at" | "assessing_time" | "assessor_id"
>;

export type AssessmentStatus = null | "pending" | "completed" | "failed";

export type Writing = Awaited<ReturnType<typeof getSingleWriting>> | undefined;

export type Assessment =
  | Awaited<ReturnType<typeof getAssessmentsOfWriting>>[number]
  | undefined;
