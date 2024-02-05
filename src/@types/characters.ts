export type CharacterProps = {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: {
    path: string
    extension: string
  }
}

export type CharactersProps = {
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: Array<CharacterProps>
  }
}

export type FindCharacterProps = CharactersProps

export type ComicProps = {
  id: number
  title: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export type ComicsProps = {
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: Array<ComicProps>
  }
}
