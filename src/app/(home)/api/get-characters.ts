import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { z } from 'zod'

import { httpClient } from '@/lib/http-client'
import { type ExtractFnReturnType } from '@/lib/react-query'

import { ORDER_BY_DEFAULT_VALUE } from '../constants'
import { characterSchema, type OrderBy } from '../schemas'

const getCharactersResponseSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  total: z.number(),
  count: z.number(),
  results: z.array(characterSchema),
})

type GetCharactersResponseData = z.infer<typeof getCharactersResponseSchema>

type GetCharactersResponse = {
  data: GetCharactersResponseData
}

type GetCharactersParams = {
  page: number
  search?: string
  orderBy?: OrderBy
}

const LIMIT = 20
const getOffset = (page: number) => (page - 1) * LIMIT

export const getCharacters = async ({
  page,
  search,
  orderBy = ORDER_BY_DEFAULT_VALUE,
}: GetCharactersParams) => {
  const response = await httpClient
    .get('characters', {
      searchParams: {
        offset: getOffset(page),
        limit: LIMIT,
        ...(search ? { nameStartsWith: search } : {}),
        orderBy,
      },
    })
    .json<GetCharactersResponse>()

  return getCharactersResponseSchema.parse(response.data)
}

type QueryFnType = typeof getCharacters

export const GET_CHARACTERS_QUERY_KEY_PREFIX = 'get-characters'

export const makeCharactersQueryOptions = (params: GetCharactersParams) => {
  return {
    queryKey: [GET_CHARACTERS_QUERY_KEY_PREFIX, params],
    queryFn: () => getCharacters(params),
    staleTime: Infinity,
    cacheTime: Infinity,
  } satisfies UseQueryOptions<ExtractFnReturnType<QueryFnType>>
}

export const useGetCharactersQuery = (params: GetCharactersParams) => {
  // eslint-disable-next-line @tanstack/query/prefer-query-object-syntax
  return useQuery(makeCharactersQueryOptions(params))
}
