import ky from 'ky'

import { env } from '@/env.mjs'

import { md5 } from './md5'

const createServerAuthSearchParams = () => {
  const isClient = typeof window !== 'undefined'

  if (isClient) {
    return null
  }

  const ts = Date.now()
  const publicKey = env.NEXT_PUBLIC_MARVEL_API_KEY
  const privateKey = env.MARVEL_API_PRIVATE_KEY

  const hash = md5(`${ts}${privateKey}${publicKey}`)

  return {
    ts,
    hash,
  }
}

export const httpClient = ky.create({
  prefixUrl: env.NEXT_PUBLIC_MARVEL_API_URL,
  searchParams: {
    apikey: env.NEXT_PUBLIC_MARVEL_API_KEY,
    ...createServerAuthSearchParams(),
  },
})

export { HTTPError } from 'ky'
