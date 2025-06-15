"use server";

import { createDirectClient } from "./server";

export async function getAssessorFromModelName(modelName: string) {
  const supabase = createDirectClient();
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
