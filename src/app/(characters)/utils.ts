import { type Character } from './schemas'

export const getThumbnailAsString = (thumbnailObject: Character['thumbnail']) =>
  `${thumbnailObject.path}.${thumbnailObject.extension}`
