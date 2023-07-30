import { Pagination } from '@/components/Pagination/Pagination'
import {
  QUANTITY_ITEMS_PER_PAGE,
  getCharacters
} from '@/services/characters/charactersService'
import { CharacterCard } from '../CharacterCard/CharacterCard'

interface CharactersListPropsSchema {
  page?: string
  search?: string
}

export const CharactersList = async (props: CharactersListPropsSchema) => {
  const offset = !!props.page
    ? (Number(props.page) - 1) * QUANTITY_ITEMS_PER_PAGE
    : 0

  const characters = await getCharacters({ offset, filterName: props.search })

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      {characters.data.results.length === 0 ? (
        <h1 className="h-full w-full text-center text-white">
          Não encontramos um herói correspondente com a sua busca :(
        </h1>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:grid-cols-5 ">
            {characters.data.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <Pagination
            currentPage={Number(props.page) || 1}
            quantityItemsPerPage={QUANTITY_ITEMS_PER_PAGE}
            totalItems={characters.data.total}
          />
        </>
      )}
    </div>
  )
}
