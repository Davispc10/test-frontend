import { charactersFactory } from '@/infra/factory/genres.factory'
import md5 from 'md5'

import { env } from '../env.mjs'

type ExecuteProps = {
  id?: string
  page: string
  search?: string
}

export const execute = async <T>({ id, page, search }: ExecuteProps) => {
  console.log(page)
  const timestamp = new Date().getTime()
  const hash = md5(timestamp + env.NEXT_PUBLIC_API_PRIVATE_KEY! + env.NEXT_PUBLIC_API_PUBLIC_KEY!)

  if (id) {
    return (await charactersFactory().findById({ id })) as T
  }

  return (await charactersFactory().findAll({ hash, limit: '9', page, ts: timestamp, search })) as T
}
