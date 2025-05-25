import { Database } from "@/database.types";

export type SaveWritingDTO = Omit<
  Database["public"]["Tables"]["writings"]["Insert"],
  "writing_id" | "user_id" | "created_at" | "updated_at"
>;

export type SaveAssessmentDTO = Omit<
  Database["public"]["Tables"]["assessments"]["Insert"],
  | "assessment_id"
  | "created_at"
  | "updated_at"
  | "assessing_time"
  | "assessor_id"
>;
