import { Md5 } from 'ts-md5'
import { env } from '@/lib/envT3'

const publicKey = env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
const privateKey = env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY

interface IParams {
  page?: number
  nameStartsWith?: string
}

export const getParams = ({ page, nameStartsWith }: IParams) => {
  const md5 = new Md5()
  const timestamp = new Date().getTime()
  const hash = md5.appendStr(timestamp + privateKey + publicKey).end()
  const limit = 8
  const offset = (page ? page - 1 : 0) * limit

  const params = {
    ts: timestamp,
    apikey: publicKey,
    hash,
    limit,
    offset,
  }

  if (nameStartsWith) {
    return { ...params, nameStartsWith }
  }

  return params
}
