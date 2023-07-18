'use client'

import { QueryClientProvider } from "react-query";
import { Index } from "./pages";
import { queryClient } from './utils/utils'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QueryClientProvider client={queryClient}>
        <Index />
      </QueryClientProvider>
    </main>
  )
}
