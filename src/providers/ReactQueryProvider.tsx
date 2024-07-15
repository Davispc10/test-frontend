"use client"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          // staleTime: 1000 * 30,
        },
      },
    }),
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
