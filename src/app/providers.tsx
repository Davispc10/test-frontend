"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PaginationProvider } from "src/contexts/pagination.provider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PaginationProvider>{children}</PaginationProvider>
    </QueryClientProvider>
  );
}
