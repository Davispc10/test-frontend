import { cache } from 'react'

import { Hydrate, dehydrate } from '@tanstack/react-query'
import { headers } from 'next/headers'

import { queryClient } from '@/lib/react-query'
import { tryJsonParse } from '@/utils/json'

import { makeCharactersQueryOptions } from './api/get-characters'
import { DEFAULT_ORDER_BY } from './constants'
import { type OrderBy } from './schemas'

type HomeLayoutProps = {
  children: React.ReactNode
}

const getServerSearchParams = cache(() => {
  const query = tryJsonParse(
    decodeURIComponent(headers().get('x-invoke-query') ?? '{}'),
    {},
  )

  return new URLSearchParams(query)
})

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const serverSearchParams = getServerSearchParams()

  await queryClient.prefetchQuery(
    makeCharactersQueryOptions({
      page: Number(serverSearchParams.get('page')) ?? 1,
      orderBy:
        (serverSearchParams.get('orderBy') as OrderBy) ?? DEFAULT_ORDER_BY,
      search: serverSearchParams.get('search') ?? '',
    }),
  )

  const dehydratedState = dehydrate(queryClient)

  return <Hydrate state={dehydratedState}>{children}</Hydrate>
}
