import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app';
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query';
import { RequestProvider } from '../contexts/requests';

//Rodando a função de estilo global do stitches
//Diferente do styled-components não precisa passar via provider
globalStyles();
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <Header>
          <h1>ASSEMBLY OF HEROES</h1>
        </Header>
        <RequestProvider>
          <Component {...pageProps} />
        </RequestProvider>
      </QueryClientProvider>
    </Container>
  );
}
