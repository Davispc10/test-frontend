import { MarvelCharacter } from '@/interfaces/marvelAPI'

export function fixNotAvailableInfo(characters: MarvelCharacter[]) {
  const charactersFormatted = characters.map((character) => {
    if (character.thumbnail.path.includes('image_not_available')) {
      return {
        ...character,
        thumbnail: {
          path: '/no-image',
          extension: 'jpg',
        },
      }
    }

    if (!character.description) {
      return {
        ...character,
        description: 'Descrição não informada',
      }
    }

    return character
  })

  return charactersFormatted
}

export const quantityCharactersDisplay = (quantityCharacters: number) => {
  if (quantityCharacters === 0) return 'Não há registros'
  else if (quantityCharacters === 1) {
    return `${`${quantityCharacters}`.padStart(2, '0')} personagem`
  } else return `${`${quantityCharacters}`.padStart(2, '0')} personagens`
}
