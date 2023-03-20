import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app';
import type { AppProps } from 'next/app'
import Image from 'next/image';

import { QueryClient, QueryClientProvider } from 'react-query';

import logoImg from '../assets/marvel.svg';

globalStyles();
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <Header>
          <h1>ASSEMBLY OF HEROES</h1>
        </Header>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Container>
  );
}
