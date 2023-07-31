export interface MarvelItem {
  resourceURI: string
  name: string
}

export interface MarvelItemSet {
  available: number
  returned: number
  collectionURI: string
  items: MarvelItem[]
}

export interface MarvelUrl {
  type: string
  url: string
}

export interface MarvelCharacter {
  id: number
  name: string
  description: string
  modified: Date
  resourceURI: string
  urls: MarvelUrl[]
  thumbnail: {
    path: string
    extension: string
  }
  comics: MarvelItemSet
  stories: MarvelItemSet
  events: MarvelItemSet
  series: MarvelItemSet
}

export interface MarvelApiResponse {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: MarvelCharacter[]
  }
  etag: string
}

export interface Comic {
  id: number
  title?: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface MarvelApiComics extends MarvelApiResponse {
  results: Comic[]
}
