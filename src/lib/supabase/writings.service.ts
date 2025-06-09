"use server";

import { Database } from "@/database.types";
import { createClient } from "./server";
import { SaveWritingDTO, Writing, WritingWithLatestAssessment } from "./types";

export async function getWritingsOfUser(
  userId: string,
  page: number = 1,
  pageSize: number = 10
) {
  const supabase = await createClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("writings")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (!!error) {
    throw new Error("Error fetching assessments");
  }

  return { data: data as Writing[], totalCount: count };
}

export async function getSingleWriting(writingId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("writings")
    .select("*")
    .eq("writing_id", writingId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Writing not found");
    }
    throw new Error("Error fetching writing");
  }

  return data;
}

export async function saveWriting(writingDTO: SaveWritingDTO) {
  const writing: Database["public"]["Tables"]["writings"]["Insert"] = {
    ...writingDTO,
  };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("writings")
    .insert(writing)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Writing not found");
    }
    throw new Error("Error saving writing");
  }

  return data;
}

export async function getWritingsWithLatestAssessment(
  userId: string,
  page: number = 1,
  pageSize: number = 10
) {
  const supabase = await createClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("writings")
    .select(
      `
      *,
      latest_assessment:assessments!left(
        *,
        assessor:assessors(*)
      )
    `,
      { count: "exact" }
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error("Error fetching writings with assessments");
  }

  // Transform the data to match our type
  const transformedData = data.map((writing) => ({
    ...writing,
    latest_assessment: writing.latest_assessment?.[0] || null,
  }));

  return {
    data: transformedData as WritingWithLatestAssessment[],
    totalCount: count,
  };
}
