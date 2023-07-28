import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_MARVEL_PUBLIC_KEY: z.string().min(1),
    NEXT_PUBLIC_MARVEL_PRIVATE_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_MARVEL_PUBLIC_KEY: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
    NEXT_PUBLIC_MARVEL_PRIVATE_KEY: process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY,
  },
})
