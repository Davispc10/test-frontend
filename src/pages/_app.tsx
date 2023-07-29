import React from 'react';
import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { store } from '../app/store';

import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { queryClient } from '../utils/utils';
import { NavBar } from '../components/organisms/NavBar';

import '../styles/globals.css';

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