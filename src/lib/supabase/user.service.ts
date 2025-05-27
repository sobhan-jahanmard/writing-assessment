"use server";

import { createClient } from "@/src/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export async function ensureUserExists(userId: string) {
  const supabase = await createClient();

  console.log("checking user", userId);
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (existingUser) {
    return existingUser;
  }
  console.log("checking user", userId, existingUser);

  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert({ user_id: userId, last_free_at: new Date().toISOString() })
    .select()
    .single();

  if (insertError) {
    console.error(insertError.message);
    throw new Error(`Failed to create user: ${insertError.message}`);
  }

  return newUser;
}

export async function getUserOnServer<T extends boolean>(
  throwIfNotAuthenticated: T = false as T
): Promise<T extends true ? User : User | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    if (throwIfNotAuthenticated) {
      throw new Error("Not authenticated");
    }
    return null as T extends true ? User : User | null;
  }

  return user;
}
