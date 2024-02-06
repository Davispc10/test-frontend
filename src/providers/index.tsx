'use client'

import { client } from '@/lib/client'
import { QueryClientProvider } from '@tanstack/react-query'

type ProvidersProps = {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
