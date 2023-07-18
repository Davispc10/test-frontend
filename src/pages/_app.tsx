import React from 'react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../utils/utils'
import { NavBar } from '../components/NavBar'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Component {...pageProps} />
    </QueryClientProvider>
  ) 
}

export default MyApp
