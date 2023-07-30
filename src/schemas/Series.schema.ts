export interface SeriesSchema {
  available: number
  collectionURI: string
  items: {
    resourceURI: string
    name: string
  }[]
  returned: number
}
