"use client";
import Link from "next/link";
import { useAuth } from "../lib/supabase/use-auth";

export const SendButton = () => {
  const { user } = useAuth();
  return (
    <Link
      href={user ? "/writing/create" : "/auth"}
      className="w-full flex items-center justify-center border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2"
    >
      ارسال نوشته
    </Link>
  );
};
