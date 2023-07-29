import React from 'react';
import type { AppProps } from 'next/app'
import RootLayout from '@/app/layout'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout pageProps={pageProps}>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
