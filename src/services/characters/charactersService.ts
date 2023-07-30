import { GetCharactersResponseSchema } from './charactersService.schema'
import { api } from '@/libs/api'

export const getCharacters = (): Promise<GetCharactersResponseSchema> =>
  api.get('/characters')
