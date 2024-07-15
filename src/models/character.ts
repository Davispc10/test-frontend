import { ComicItem } from "./comic"

export type CharacterType = {
  id: string
  name: string
  description: string
  thumbnail: string
  comics: {
    available: number
    items: ComicItem[]
    returned: number
  }
}

export type CharacterDTO = {
  id: string
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  resourceURI: string
  comics: {
    available: number
    collectionURI: string
    items: ComicItem[]
    returned: number
  }
}
