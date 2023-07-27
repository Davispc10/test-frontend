// @ts-check
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    MARVEL_API_PRIVATE_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_MARVEL_API_URL: z.string().url(),
    NEXT_PUBLIC_MARVEL_API_KEY: z.string(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_MARVEL_API_URL: process.env.NEXT_PUBLIC_MARVEL_API_URL,
    NEXT_PUBLIC_MARVEL_API_KEY: process.env.NEXT_PUBLIC_MARVEL_API_KEY,
    MARVEL_API_PRIVATE_KEY: process.env.MARVEL_API_PRIVATE_KEY,
  },
})
