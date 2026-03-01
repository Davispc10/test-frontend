import { QueryClient } from "@tanstack/react-query";

/** Cache mínimo de 30 segundos conforme requisito */
const STALE_TIME_MS = 30 * 1000;
const GC_TIME_MS = 5 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      gcTime: GC_TIME_MS,
    },
  },
});
