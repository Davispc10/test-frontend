import { Md5 } from 'ts-md5'
import { env } from '@/lib/envT3'

const publicKey = env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
const privateKey = env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY

interface IParams {
  page?: number
}

export const getParams = ({ page }: IParams) => {
  const md5 = new Md5()
  const timestamp = new Date().getTime()
  const hash = md5.appendStr(timestamp + privateKey + publicKey).end()

  if (page) {
    const limit = 12
    const offset = (page - 1) * limit

    return {
      ts: timestamp,
      apikey: publicKey,
      hash,
      limit,
      offset,
    }
  }

  return {
    ts: timestamp,
    apikey: publicKey,
    hash,
  }
}
