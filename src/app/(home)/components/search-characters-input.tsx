'use client'

import { useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateQueryString } from '@/hooks/use-create-query-string'

import { SEARCH_QUERY_PARAM } from '../constants'

export const SearchCharactersInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const createQueryString = useCreateQueryString()

  const search = searchParams.get(SEARCH_QUERY_PARAM) ?? ''

  const handleOnSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formData = new FormData(event.currentTarget)
      const search = formData.get(SEARCH_QUERY_PARAM) as string

      router.push(
        `${pathname}?${createQueryString(SEARCH_QUERY_PARAM, search)}`,
      )
    },
    [createQueryString, pathname, router],
  )

  return (
    <form
      className="flex w-full max-w-sm items-center space-x-2"
      onSubmit={handleOnSubmit}
    >
      <Input
        placeholder="Procure por um personagem"
        defaultValue={search}
        name={SEARCH_QUERY_PARAM}
      />

      <Button type="submit">Buscar</Button>
    </form>
  )
}
