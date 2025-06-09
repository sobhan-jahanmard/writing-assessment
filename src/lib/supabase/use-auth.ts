"use client";

import { useQuery } from "@tanstack/react-query";
import { createBrowserClient } from "./client";
import { usePathname } from "next/navigation";

export const userQueryKey = ["auth"];

export const useAuth = () => {
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: [...userQueryKey, pathname],
    queryFn: async () => {
      const supabase = createBrowserClient();
      const { data } = await supabase.auth.getUser();
      return data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return { user: data?.user };
};
