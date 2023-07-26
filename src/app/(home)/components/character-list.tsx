'use client'

import { useSearchParams } from 'next/navigation'

import { useGetCharactersQuery } from '../api/get-characters'
import {
  ORDER_BY_DEFAULT_VALUE,
  ORDER_BY_SEARCH_PARAM,
  SEARCH_QUERY_PARAM,
} from '../constants'
import { type OrderBy } from '../schemas'

export const CharacterList = () => {
  const searchParams = useSearchParams()

  const orderBy = (searchParams.get(ORDER_BY_SEARCH_PARAM) ??
    ORDER_BY_DEFAULT_VALUE) as OrderBy

  const search = searchParams.get(SEARCH_QUERY_PARAM) ?? ''

  const { status, data } = useGetCharactersQuery({
    page: 1,
    orderBy,
    search,
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error</div>
  }

  return (
    <div>
      <h1>CharacterList</h1>

      {data.results.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  )
}
