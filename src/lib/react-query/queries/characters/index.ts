import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

import { api } from '@/services/apiClient'
import { getParams } from '@/services/paramsMarvel'
import { MarvelApiResponse } from '@/interfaces/marvelAPI'

interface IFetchCharacters {
  page?: number
  nameStartsWith?: string
}

async function getAllCharacters(ctx: QueryFunctionContext) {
  const [, nameStartsWith, page] = ctx.queryKey as [string, string, number]
  const params = getParams({ nameStartsWith, page })
  const { data } = await api.get<MarvelApiResponse>('/characters', { params })

  return data
}

export function useFetchAllCharacters({
  nameStartsWith,
  page,
}: IFetchCharacters) {
  return useQuery({
    queryKey: ['all_characters', nameStartsWith, page],
    queryFn: getAllCharacters,
    keepPreviousData: true,
  })
}
