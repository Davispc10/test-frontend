import { cache } from 'react'

import { QueryClient } from '@tanstack/react-query'

import { queryConfig } from './query-client'

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: queryConfig,
    }),
)

export default getQueryClient
