'use server'

import { FindCharacterProps } from '@/@types/characters'
import { execute } from '@/utils/execute'

type FindCharactersProps = {
  characterId: string
}

export const findCharacter = async ({ characterId }: FindCharactersProps) => {
  const findCharacter = await execute<FindCharacterProps>(`/characters/${characterId}`)
  const result = findCharacter.data.results[0]

  return result
}
