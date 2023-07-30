export interface StoriesSchema {
  available: number
  collectionURI: string
  items: {
    resourceURI: string
    name: string
    type: string
  }[]
  returned: number
}
