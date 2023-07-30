import { Pagination } from '@/components/Pagination/Pagination'
import {
  QUANTITY_ITEMS_PER_PAGE,
  getCharacters
} from '@/services/characters/charactersService'
import Image from 'next/image'
import Link from 'next/link'
import { CharacterCard } from '../CharacterCard/CharacterCard'
import { Filters } from '../Filters/Filters'

interface CharactersListPropsSchema {
  page?: string
}

export const CharactersList = async (props: CharactersListPropsSchema) => {
  const offset = !!props.page
    ? (Number(props.page) - 1) * QUANTITY_ITEMS_PER_PAGE
    : 0

  const characters = await getCharacters({ offset })

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16">
      <Filters />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-5 gap-8 ">
          {characters.data.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
        <Pagination
          currentPage={Number(props.page) || 1}
          quantityItemsPerPage={QUANTITY_ITEMS_PER_PAGE}
          totalItems={characters.data.total}
        />
      </div>
    </div>
  )
}
