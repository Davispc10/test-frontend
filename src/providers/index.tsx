'use client'
import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@/service/query-client'

export const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
