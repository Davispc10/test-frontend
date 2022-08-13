import type { AppProps } from 'next/app'
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CharacterProvider } from '../modules/character/context/CharacterContext';
import { Theme } from '../theme/global';
import { ChakraProvider } from '@chakra-ui/react';


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <ChakraProvider theme={Theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CharacterProvider >
            <Component {...pageProps} />
          </CharacterProvider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
