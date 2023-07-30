import { ApiResponseSchema } from '@/libs/api.schema'
import { CharacterSchema } from '@/schemas/Character.schema'

export interface GetCharactersResquestSchema {
  offset?: number
  filterName?: string
}

export type GetCharactersResponseSchema = ApiResponseSchema<CharacterSchema[]>

export interface GetCharacterResquestSchema {
  id: string
}

export type GetCharacterResponseSchema = ApiResponseSchema<CharacterSchema[]>
