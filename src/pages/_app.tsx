import '@/styles/global.css'
import DefaultLayout from '@/layout'
import type { AppProps } from 'next/app'

import { queryClient } from '@/services/QueryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { CharacterProvider } from '@/context/OffSetPageContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CharacterProvider>
      <DefaultLayout>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </DefaultLayout>
    </CharacterProvider>
  )
}
