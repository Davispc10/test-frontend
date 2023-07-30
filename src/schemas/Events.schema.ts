export interface EventsSchema {
  available: number
  collectionURI: string
  items: {
    resourceURI: string
    name: string
  }[]
  returned: number
}
