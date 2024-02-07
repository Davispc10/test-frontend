'use server'

import { CharacterEntity } from '@/domain/characters/enterprise/characters.entity'
import { execute } from '@/utils/execute'

type FindCharactersProps = {
  search?: string
  page?: string
  id?: string
}

export const findCharacters = async ({ search, page = '1', id }: FindCharactersProps) => {
  const characters = await execute<CharacterEntity>({ id, page, search })

  return characters
}
