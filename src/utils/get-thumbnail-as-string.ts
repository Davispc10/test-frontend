import { type Character } from '@/app/(home)/schemas'

export const getThumbnailAsString = (thumbnailObject: Character['thumbnail']) =>
  `${thumbnailObject.path}.${thumbnailObject.extension}`
