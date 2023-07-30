export interface ComicsSchema {
  available: number
  collectionURI: string
  items: {
    resourceURI: string
    name: string
  }[]
  returned: number
}
