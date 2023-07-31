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
