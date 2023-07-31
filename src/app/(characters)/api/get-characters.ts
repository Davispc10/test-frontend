import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { z } from 'zod'

import { httpClient } from '@/lib/http-client'
import { type ExtractFnReturnType } from '@/lib/query-client'

import { DEFAULT_ORDER_BY } from '../constants'
import { characterSchema, type OrderBy } from '../schemas'
import { fixCharacterData } from './utils'

export const getCharactersResponseSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  total: z.number(),
  count: z.number(),
  results: z.array(characterSchema),
})

export type GetCharactersResponseData = z.infer<
  typeof getCharactersResponseSchema
>

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
  orderBy = DEFAULT_ORDER_BY,
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

  const parsedData = getCharactersResponseSchema.parse(response.data)

  return {
    ...parsedData,
    results: parsedData.results.map(fixCharacterData),
  } satisfies GetCharactersResponseData
}

type QueryFnType = typeof getCharacters

export const GET_CHARACTERS_QUERY_KEY_PREFIX = 'get-characters'

const FIVE_MINUTES = 1000 * 60 * 5

export const makeCharactersQueryOptions = ({
  page,
  orderBy,
  search,
}: GetCharactersParams) => {
  return {
    queryKey: [GET_CHARACTERS_QUERY_KEY_PREFIX, { page, orderBy, search }],
    queryFn: () => getCharacters({ page, orderBy, search }),
    staleTime: FIVE_MINUTES,
    cacheTime: FIVE_MINUTES * 2,
    keepPreviousData: true,
  } satisfies UseQueryOptions<ExtractFnReturnType<QueryFnType>>
}

export const useGetCharactersQuery = (params: GetCharactersParams) => {
  // eslint-disable-next-line @tanstack/query/prefer-query-object-syntax
  return useQuery(makeCharactersQueryOptions(params))
}
