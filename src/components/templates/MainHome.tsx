import { useCharactersStore } from '@/store/characters'
import { useFetchAllCharacters } from '@/lib/react-query/queries/characters'
import { fixNotAvailableInfo } from '@/utils'
import { Atom } from '../atoms'
import { Molecule } from '../molecules'
import { Organism } from '../organisms'

export function MainHome() {
  const { page, query, setPage } = useCharactersStore()

  const { data } = useFetchAllCharacters({
    nameStartsWith: query,
    page,
  })

  const characters = data ? fixNotAvailableInfo(data.data.results) : []

  let pageCount = 0
  let total = 0
  if (data?.data.total) {
    total = data.data.total
    pageCount = Math.ceil(data.data.total / 8)
  }

  return (
    <div className="main-bg h-full min-h-screen w-full bg-cover bg-fixed bg-center">
      <Organism.Header />
      <main className="mx-auto min-h-screen max-w-7xl px-4 pb-4 pt-32">
        <Molecule.InfoPage title="Personagens" countCharacters={total} />
        <Molecule.CardsContainer characters={characters} />
        <Atom.Pagination setPage={setPage} pageCount={pageCount} />
      </main>
      <Organism.Footer />
    </div>
  )
}
