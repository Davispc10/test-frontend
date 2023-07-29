export interface IHeros {
  id: string
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  comics: {
    available: number
  }
}

export interface IHerosCard {
  id?: string
  name: string
  description: string
  thumbnail: string
  comics: number
}
