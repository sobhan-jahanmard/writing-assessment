"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/src/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  redirect("/dashboard?invalidate=true");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  console.log("dadada", error);

  if (error) {
    redirect("/error");
  }

  redirect("/auth/verify");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/?invalidate=true");
}
