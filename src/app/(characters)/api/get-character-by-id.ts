import { z } from 'zod'

import { httpClient } from '@/lib/http-client'

import { characterSchema, type Character } from '../schemas'
import { fixCharacterData } from './utils'

const getCharacterByIdResponseSchema = z.object({
  results: z.array(characterSchema),
})

type GetCharacterByIdResponseData = z.infer<
  typeof getCharacterByIdResponseSchema
>

type GetCharacterByIdResponse = {
  data: GetCharacterByIdResponseData
}

export const getCharacterById = async (characterId: Character['id']) => {
  const response = await httpClient
    .get(`characters/${characterId}`)
    .json<GetCharacterByIdResponse>()

  const parsedData = getCharacterByIdResponseSchema.parse(response.data)
  const [character] = parsedData.results.map(fixCharacterData)

  return character
}
