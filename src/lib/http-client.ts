import ky from 'ky'

import { env } from '@/env.mjs'

export const httpClient = ky.create({
  prefixUrl: env.NEXT_PUBLIC_MARVEL_API_URL,
  searchParams: {
    apikey: env.NEXT_PUBLIC_MARVEL_API_KEY,
  },
})

export { HTTPError } from 'ky'
