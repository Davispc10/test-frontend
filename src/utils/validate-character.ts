import { defaultDescription, defaultImage } from '@/consts'
import { CharacterDetailsEntity } from '@/domain/characters/enterprise/characters-details.entity'

export const validateCharacter = (characters: CharacterDetailsEntity) => {
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
