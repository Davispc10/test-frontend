export type ComicsProps = {
  id: number
  title: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export type ComicsEntity = {
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: Array<ComicsProps>
  }
}
