"use server";

import { createClient } from "./server";

export async function getAssessorFromModelName(modelName: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assessors")
    .select("*")
    .eq("model_name", modelName)
    ?.single();

  if (!!error) {
    throw new Error("Error fetching assessors");
  }

  return data;
}
