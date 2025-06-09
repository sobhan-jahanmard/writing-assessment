"use client";

import { useQuery } from "@tanstack/react-query";
import { createBrowserClient } from "./client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const userQueryKey = ["auth"];

export const useAuth = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const invalidate = searchParams.get("invalidate") === "true";

  const { data } = useQuery({
    queryKey: [...userQueryKey, pathname],
    queryFn: async () => {
      const supabase = createBrowserClient();
      const { data } = await supabase.auth.getUser();
      return data;
    },
  });

  useEffect(() => {
    if (invalidate) {
      queryClient.invalidateQueries({ queryKey: userQueryKey });
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("invalidate");
      router.replace(
        `${pathname}${
          newSearchParams.toString() ? `?${newSearchParams.toString()}` : ""
        }`
      );
    }
  }, [invalidate, queryClient, pathname, router, searchParams]);

  return { user: data?.user };
};
