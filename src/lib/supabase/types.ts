import { Database } from "@/database.types";

export type SaveWritingDTO = Omit<
  Database["public"]["Tables"]["writings"]["Insert"],
  "writing_id" | "created_at" | "updated_at"
>;

export type SaveAssessmentDTO = Omit<
  Database["public"]["Tables"]["assessments"]["Insert"],
  "created_at" | "updated_at" | "assessing_time" | "assessor_id"
>;

export type AssessmentStatus = null | "pending" | "completed" | "failed";
