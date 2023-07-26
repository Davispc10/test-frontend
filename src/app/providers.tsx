'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/react-query'

type ProvidersProps = {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
