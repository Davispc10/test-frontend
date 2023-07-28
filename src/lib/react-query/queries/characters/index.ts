import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

import { api } from '@/services/apiClient'
import { getParams } from '@/services/paramsMarvel'
import { MarvelApiResponse } from '@/interfaces/marvelAPI'

async function getAllCharacters(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey as [string, number]
  const params = getParams({ page })
  const { data } = await api.get<MarvelApiResponse>('/characters', { params })

  return data
}

export function useFetchAllCharacters(page: number) {
  return useQuery(['all_characters', page], getAllCharacters)
}
