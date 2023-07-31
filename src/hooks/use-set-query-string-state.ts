import { useCallback } from 'react'

import { usePathname, useRouter } from 'next/navigation'

export const useSetQueryStringState = () => {
  const router = useRouter()
  const pathname = usePathname()

  const setQueryStringState = useCallback(
    (newSearchParams: Record<string, string | null>) => {
      const searchParams = new URLSearchParams(
        globalThis.window?.location.search,
      )

      for (const [name, value] of Object.entries(newSearchParams)) {
        value === null
          ? searchParams.delete(name)
          : searchParams.set(name, value)
      }

      router.push(`${pathname}?${searchParams.toString()}`)
    },
    [pathname, router],
  )

  return setQueryStringState
}
