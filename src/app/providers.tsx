"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "../lib/supabase/query-client";

const queryClient = getQueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
