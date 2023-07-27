import { cache } from 'react'

import { Hydrate, dehydrate } from '@tanstack/react-query'
import { headers } from 'next/headers'

import getQueryClient from '@/lib/react-query.server'

import { makeCharactersQueryOptions } from './api/get-characters'
import { DEFAULT_ORDER_BY } from './constants'
import { type OrderBy } from './schemas'

type HomeLayoutProps = {
  children: React.ReactNode
}

const getServerSearchParams = cache(() => {
  const query = decodeURIComponent(headers().get('x-search-params') ?? '{}')

  return new URLSearchParams(query)
})

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const serverSearchParams = getServerSearchParams()
  const queryClient = getQueryClient()

  const searchParamsPage = serverSearchParams.get('page')

  await queryClient.prefetchQuery(
    makeCharactersQueryOptions({
      page: searchParamsPage ? Number(searchParamsPage) : 1,
      orderBy:
        (serverSearchParams.get('orderBy') as OrderBy) ?? DEFAULT_ORDER_BY,
      search: serverSearchParams.get('search') ?? '',
    }),
  )

  const dehydratedState = dehydrate(queryClient)

  return <Hydrate state={dehydratedState}>{children}</Hydrate>
}
