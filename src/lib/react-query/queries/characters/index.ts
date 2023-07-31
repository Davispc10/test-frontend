import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

import { api } from '@/services/apiClient'
import { getParams } from '@/services/paramsMarvel'
import { MarvelApiComics, MarvelApiResponse } from '@/interfaces/marvelAPI'

interface IFetchCharacters {
  page?: number
  nameStartsWith?: string
}

interface IGetComicsById {
  id: number
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

async function getCharacterById(ctx: QueryFunctionContext) {
  const [, id] = ctx.queryKey as [string, number]
  const params = getParams({})
  const { data } = await api.get<MarvelApiComics>(`/characters/${id}`, {
    params,
  })

  return data
}

export function useCharacterById({ id }: IGetComicsById) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: getCharacterById,
  })
}

async function getComicsByCharacterId(ctx: QueryFunctionContext) {
  const [, id] = ctx.queryKey as [string, number]
  const params = getParams({})
  const { data } = await api.get<MarvelApiComics>(`/characters/${id}/comics`, {
    params,
  })

  return data
}

export function useComicsByCharacterId({ id }: IGetComicsById) {
  return useQuery({
    queryKey: ['comics', id],
    queryFn: getComicsByCharacterId,
  })
}
