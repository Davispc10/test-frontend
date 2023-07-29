'use client'

import React from 'react'
import {
  Hydrate,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'

function Providers({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>{children}</Hydrate>
    </QueryClientProvider>
  )
}

export default Providers
