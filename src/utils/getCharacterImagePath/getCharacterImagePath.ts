import defaultPathImage from '@/assets/defaultCharacterImage.jpg'
import { GetCharacterImagePathPropsSchema } from './getCharacterImagePath.schema'

/**
 * This function return image of character if he not has image, return default image
 */
export const getCharacterImagePath = ({
  thumbnailPath
}: GetCharacterImagePathPropsSchema) => {
  const imageNotFound = thumbnailPath.match(/\bimage_not_available\b/g)

  const characterThumbnail = imageNotFound ? defaultPathImage : thumbnailPath

  return characterThumbnail
}
