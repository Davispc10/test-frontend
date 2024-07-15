export type ComicItem = {
  resourceURI: string
  name: string
}

export type ComicType = {
  id: number
  title: string
  thumbnail: string
}

export type ComicDTO = {
  id: number
  title: string
  thumbnail: {
    path: string
    extension: string
  }
}
