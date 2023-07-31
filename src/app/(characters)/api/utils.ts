import { type Character } from '../schemas'

const IMAGE_PLACEHOLDER_URL = '/marvel-placeholder-image'
const IMAGE_PLACEHOLDER_EXTENSION = 'jpg'
const DESCRIPTION_PLACEHOLDER = 'No description available.'

export const fixCharacterData = (character: Character): Character => {
  const isImageNotAvailable = character.thumbnail.path.includes(
    'image_not_available',
  )

  return {
    ...character,
    description: character.description || DESCRIPTION_PLACEHOLDER,
    thumbnail: isImageNotAvailable
      ? { path: IMAGE_PLACEHOLDER_URL, extension: IMAGE_PLACEHOLDER_EXTENSION }
      : character.thumbnail,
  }
}
