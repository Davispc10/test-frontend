import { z } from 'zod'

import { httpClient } from '@/lib/http-client'

import { comicSchema, type Character } from '../schemas'

const getCharacterComicsResponseSchema = z.object({
  data: z.object({
    results: z.array(comicSchema),
  }),
})

type GetCharacterComicsResponseData = z.infer<
  typeof getCharacterComicsResponseSchema
>

type GetCharacterComicsResponse = {
  data: GetCharacterComicsResponseData
}

export const getCharacterComics = async (characterId: Character['id']) => {
  const response = await httpClient
    .get(`characters/${characterId}/comics`, {
      searchParams: {
        orderBy: '-onsaleDate',
      },
    })
    .json<GetCharacterComicsResponse>()

  return getCharacterComicsResponseSchema.parse(response).data.results
}
