import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../utils/utils';
import { NavBar } from '../components/NavBar';

import { store } from '../app/store'
import { Provider } from 'react-redux'

import '../styles/globals.css';

import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
};

export default MyApp;