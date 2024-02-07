import { CharactersProps } from '@/@types/characters'
import { defaultDescription, defaultImage } from '@/consts'

export const validateCharacters = (characters: CharactersProps) => {
  const charactersMapped = characters.data.results.map((char) => {
    if (char.thumbnail.path.includes('image_not_available')) {
      char.thumbnail.path = defaultImage
      char.thumbnail.extension = 'jpeg'
    }

    char.thumbnail.path = `${char.thumbnail.path}.${char.thumbnail.extension}`

    if (!char.description) {
      char.description = defaultDescription
    }

    return char
  })

  return charactersMapped
}
