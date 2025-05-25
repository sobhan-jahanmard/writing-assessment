"use server";

import { Database } from "@/database.types";
import { createClient } from "./server";
import { SaveWritingDTO } from "./types";

export async function getWritingsOfUser(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("writings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!!error) {
    throw new Error("Error fetching assessments");
  }

  return data;
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
