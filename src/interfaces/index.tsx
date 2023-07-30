export interface IHeros {
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  comics: {
    items: Array<{ resourceURI: string; name: string }>
  }
}

export interface IHerosCard {
  id?: string
  name: string
  description: string
  thumbnail: string
  comics: number
}
