import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../utils/utils';
import { NavBar } from '../components/NavBar';

import '../styles/globals.css';

import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;