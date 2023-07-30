export interface GetCharactersResquestSchema {
  offset?: number
}

export interface GetCharactersResponseSchema {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  etag: string
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: CharacterSchema[]
  }
}

export interface CharacterSchema {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: {
    path: string
    extension: string
  }
  resourceURI: string
  comics: ComicsSchema
  series: SeriesSchema
  stories: StoriesSchema
  events: EventsSchema
  urls: {
    type: string
    url: string
  }[]
}

export interface ComicsSchema {
  available: number
  collectionURI: string
  items: {
    resourceURI: string
    name: string
  }[]
  returned: number
}

export interface SeriesSchema {
  available: number
  collectionURI: string
  items: {
    resourceURI: string
    name: string
  }[]
  returned: number
}

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

export interface EventsSchema {
  available: number
  collectionURI: string
  items: {
    resourceURI: string
    name: string
  }[]
  returned: number
}
