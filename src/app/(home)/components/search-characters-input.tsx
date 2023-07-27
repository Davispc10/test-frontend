'use client'

import { useCallback } from 'react'

import { useIsFetching } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useSetQueryStringState } from '@/hooks/use-set-query-string-state'

import { GET_CHARACTERS_QUERY_KEY_PREFIX } from '../api/get-characters'
import { PAGE_QUERY_PARAM, SEARCH_QUERY_PARAM } from '../constants'

export const SearchCharactersInput = () => {
  const searchParams = useSearchParams()
  const setQueryStringState = useSetQueryStringState()
  const isFetching = !!useIsFetching([GET_CHARACTERS_QUERY_KEY_PREFIX])

  const search = searchParams.get(SEARCH_QUERY_PARAM) ?? ''

  const handleOnSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formData = new FormData(event.currentTarget)
      const search = formData.get(SEARCH_QUERY_PARAM) as string

      setQueryStringState({
        [SEARCH_QUERY_PARAM]: search,
        [PAGE_QUERY_PARAM]: '1',
      })
    },
    [setQueryStringState],
  )

  return (
    <form
      className="flex w-full items-center space-x-2 sm:max-w-sm"
      onSubmit={handleOnSubmit}
    >
      <div className="relative w-full">
        <Input
          placeholder="Search characters"
          defaultValue={search}
          name={SEARCH_QUERY_PARAM}
        />

        {isFetching && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
            <Spinner className="h-6 w-6 text-gray-200" />
          </div>
        )}
      </div>

      <Button type="submit">Search</Button>
    </form>
  )
}
