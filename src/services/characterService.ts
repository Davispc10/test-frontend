import { CharacterDTO, CharacterType } from '@/models/character';
import { CharacterRepository } from '../repositories/CharacterRepository';
import marvelCover from "@/assets/marvel_cover.jpeg"
import { ComicDTO, ComicType } from '@/models/comic';

const characterRepository = new CharacterRepository()

function processingCharactersImage(characters: CharacterDTO[]): CharacterType[] {
  return characters.map((character) => {
    let newImage = ''
    
    if (character.thumbnail.path.includes("image_not_available")) {
      newImage = marvelCover.src
    }

    const thumbnail = newImage || `${character.thumbnail.path}.${character.thumbnail.extension}`

    return {
      ...character,
      thumbnail: thumbnail
    }
  })
}

function processingCharacterDescription(character: CharacterType): CharacterType {
  return {
    ...character,
    description: character.description || "Descrição não informada."
  }
}

function optmizeComics(comics: ComicDTO[]): ComicType[] {
  return comics.filter((comic) => {
    return !comic.thumbnail.path.includes("image_not_available")
  }).map((comic) => {
    return {
      ...comic,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`
    }
  })
}

export const characterService = {
  getAllCharacters: async (offset: number, keyword: string) => {
    const data = await characterRepository.getAll(offset, keyword)

    const charactersAdjusted = processingCharactersImage(data.results)

    return {
      results: charactersAdjusted,
      total: data.total
    }
  },

  getCharacter: async (characterId: string) => {
    const data = await characterRepository.getById(characterId)
    const charactersAdjusted = processingCharactersImage(data.results)
    const characterAdjusted = processingCharacterDescription(charactersAdjusted[0])
    return characterAdjusted
  },

  getCharacterComics: async (characterId: string) => {
    const data = await characterRepository.getComics(characterId)
    return optmizeComics(data.results)
  }
}
