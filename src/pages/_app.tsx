import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app';
import type { AppProps } from 'next/app'
import Image from 'next/image';

import logoImg from '../assets/marvel.svg';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <h1>ASSEMBLY OF HEROES</h1>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
