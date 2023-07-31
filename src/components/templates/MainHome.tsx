import { useCharactersStore } from '@/store/characters'
import { Organism } from '../organisms'
import { useFetchAllCharacters } from '@/lib/react-query/queries/characters'
import { fixNotAvailableInfo } from '@/utils'

export function MainHome() {
  const { page, query } = useCharactersStore()

  const { data, isError, isLoading } = useFetchAllCharacters({
    nameStartsWith: query,
    page,
  })

  const characters = data ? fixNotAvailableInfo(data.data.results) : []

  return (
    <div className="main-bg h-full min-h-screen w-full bg-cover bg-fixed bg-center">
      <main className="mx-auto max-w-7xl px-4 pb-4 pt-12">
        <Organism.CardsContainer characters={characters} />
      </main>
    </div>
  )
}
