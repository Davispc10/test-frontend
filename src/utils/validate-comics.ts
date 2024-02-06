import { defaultDescription, defaultImage } from '@/consts'
import { ComicsEntity } from '@/domain/comics/enterprise/comics.entity'

export const validateComics = (comics: ComicsEntity) => {
  const comicsMapped = comics.data.results.map((com) => {
    if (com.thumbnail.path.includes('image_not_available')) {
      com.thumbnail.path = defaultImage
      com.thumbnail.extension = 'jpeg'
    }

    com.thumbnail.path = `${com.thumbnail.path}.${com.thumbnail.extension}`

    if (!com.description) {
      com.description = defaultDescription
    }

    return com
  })

  return comicsMapped
}
