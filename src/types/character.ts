import { ComicItem } from "./comic"

export type CharacterType = {
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
//   series: {
//     available: number
//     collectionURI: string
//     items: Serie[]
//     returned: number
//   }
//   stories: {
//     available: number
//     collectionURI: string
//     items: Story[]
//     returned: number
//   }
}
