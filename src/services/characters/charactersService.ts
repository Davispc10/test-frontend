import {
  GetCharacterResponseSchema,
  GetCharacterResquestSchema,
  GetCharactersResponseSchema,
  GetCharactersResquestSchema
} from './charactersService.schema'

import { api } from '@/libs/api'

export const QUANTITY_ITEMS_PER_PAGE = 30

export const getCharacters = ({
  offset,
  filterName
}: GetCharactersResquestSchema): Promise<GetCharactersResponseSchema> =>
  api.get('/characters', {
    params: {
      limit: QUANTITY_ITEMS_PER_PAGE,
      offset,
      nameStartsWith: filterName
    }
  })

export const getCharacter = ({
  id
}: GetCharacterResquestSchema): Promise<GetCharacterResponseSchema> =>
  api.get(`/characters/${id}}`)
