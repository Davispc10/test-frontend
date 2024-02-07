type CharacterProps = {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: {
    path: string
  }
}

export type CharacterEntity = {
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: Array<CharacterProps>
  }
}
