import QueryProvider from '@/providers/QueryClientProvider'
import '@/globals.css'
import type { Metadata } from 'next'
import ReduxProvider from '@/providers/ReduxProvider'

export const metadata: Metadata = {
  title: 'Desafio Marvel - Heróis',
  description: 'Desafio Marvel Dinherow - Heróis',
}

export default function HerosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ReduxProvider>
  )
}
