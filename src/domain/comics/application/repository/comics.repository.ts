import { ComicsEntity } from '../../enterprise/comics.entity'

export type FindAllComicsProps = {
  hash: string
  ts: number
  id: string
}

export interface ComicsRepository {
  findAll({ hash, ts, id }: FindAllComicsProps): Promise<ComicsEntity>
}
