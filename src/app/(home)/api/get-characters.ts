import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { z } from 'zod'

import { httpClient } from '@/lib/http-client'
import { type ExtractFnReturnType } from '@/lib/react-query'

import { DEFAULT_ORDER_BY } from '../constants'
import { type Character, characterSchema, type OrderBy } from '../schemas'

const getCharactersResponseSchema = z.object({
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

const IMAGE_PLACEHOLDER_URL = '/marvel-placeholder-image'
const IMAGE_PLACEHOLDER_EXTENSION = 'jpg'

const fixCharacterImage = (character: Character): Character => {
  const isImageNotAvailable = character.thumbnail.path.includes(
    'image_not_available',
  )

  return {
    ...character,
    thumbnail: isImageNotAvailable
      ? { path: IMAGE_PLACEHOLDER_URL, extension: IMAGE_PLACEHOLDER_EXTENSION }
      : character.thumbnail,
  }
}

export const getCharacters = async ({
  page,
  search,
  orderBy = DEFAULT_ORDER_BY,
}: GetCharactersParams) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

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
    results: parsedData.results.map(fixCharacterImage),
  } satisfies GetCharactersResponseData
}

type QueryFnType = typeof getCharacters

export const GET_CHARACTERS_QUERY_KEY_PREFIX = 'get-characters'

const FIVE_MINUTES = 1000 * 60 * 5

export const makeCharactersQueryOptions = (params: GetCharactersParams) => {
  return {
    queryKey: [GET_CHARACTERS_QUERY_KEY_PREFIX, params],
    queryFn: () => getCharacters(params),
    staleTime: FIVE_MINUTES,
    cacheTime: FIVE_MINUTES * 2,
    keepPreviousData: true,
  } satisfies UseQueryOptions<ExtractFnReturnType<QueryFnType>>
}

export const useGetCharactersQuery = (params: GetCharactersParams) => {
  // eslint-disable-next-line @tanstack/query/prefer-query-object-syntax
  return useQuery({ ...makeCharactersQueryOptions(params) })
}
