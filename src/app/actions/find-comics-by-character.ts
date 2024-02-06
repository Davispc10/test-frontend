'use server'

import { ComicsProps } from '@/@types/characters'
import { execute } from '@/utils/execute'

type FindComics = {
  characterId: string
}

export const findComicsByCharacter = async ({ characterId }: FindComics) => {
  const findCharacter = await execute<ComicsProps>(`/characters/${characterId}/comics`)
  return findCharacter.data.results
}
