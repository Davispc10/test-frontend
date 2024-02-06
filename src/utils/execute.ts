import { charactersFactory } from '@/infra/factory/characters.factory'
import { comicsFactory } from '@/infra/factory/comics.factory'
import md5 from 'md5'

import { env } from '../env.mjs'

type ExecuteProps = {
  id?: string
  page: string
  search?: string
  isComic?: boolean
}

export const execute = async <T>({ id, page, search, isComic }: ExecuteProps) => {
  const timestamp = new Date().getTime()
  const hash = md5(timestamp + env.NEXT_PUBLIC_API_PRIVATE_KEY! + env.NEXT_PUBLIC_API_PUBLIC_KEY!)

  if (isComic && id) {
    return (await comicsFactory().findAllByCharacterId({ hash, id, ts: timestamp })) as T
  }

  if (id && !isComic) {
    return (await charactersFactory().findById({ id, hash, ts: timestamp })) as T
  }

  return (await charactersFactory().findAll({ hash, limit: '9', page, ts: timestamp, search })) as T
}
