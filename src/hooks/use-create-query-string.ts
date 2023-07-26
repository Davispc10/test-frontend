import { useCallback } from 'react'

import { useSearchParams } from 'next/navigation'

export const useCreateQueryString = () => {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return createQueryString
}
