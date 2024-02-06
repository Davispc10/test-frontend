type CharacterProps = {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: {
    path: string
    extension: string
  }
}

export type CharacterDetailsEntity = {
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: Array<CharacterProps>
  }
}
