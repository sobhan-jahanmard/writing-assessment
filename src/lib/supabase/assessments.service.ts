"use server";

import { Database } from "@/database.types";
import { createClient } from "./server";
import { SaveAssessmentDTO } from "./types";
import { generateRandomAssessingTime } from "../generate-random-assessing-time";
import { getAssessorFromModelName } from "./assessor.service";

export async function getAssessmentsOfWriting(writingId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("writing_id", writingId);

  if (!!error) {
    throw new Error("Error fetching assessments");
  }

  return data;
}

export async function saveAssessment(
  assessmentDTO: SaveAssessmentDTO,
  modelName: string
) {
  const supabase = await createClient();
  const assessingTime = generateRandomAssessingTime();

  const assessor = await getAssessorFromModelName(modelName);

  const assessment: Database["public"]["Tables"]["assessments"]["Insert"] = {
    ...assessmentDTO,
    assessing_time: assessingTime,
    assessor_id: assessor.assessor_id,
  };

  const { data, error } = await supabase
    .from("assessments")
    .upsert(assessment)
    .select()
    .single();

  if (!!error) {
    throw new Error("Error saving assessment");
  }

  return data;
}
