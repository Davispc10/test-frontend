'use server'

import { ComicsEntity } from '@/domain/comics/enterprise/comics.entity'
import { execute } from '@/utils/execute'

type FindComics = {
  characterId: string
}

export const findComicsByCharacter = async ({ characterId }: FindComics) => {
  const findCharacter = await execute<ComicsEntity>({ page: '1', id: characterId, isComic: true })
  return findCharacter.data.results
}
