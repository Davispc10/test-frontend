import { useFetchAllCharacters } from '@/lib/react-query/queries/characters'
import { Atom } from '@/components/atoms'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { fixNotAvailableInfo } from '@/utils'

export default function HomePage() {
  const { data, isError, isLoading } = useFetchAllCharacters({
    page: 1,
  })
  const characters = data ? fixNotAvailableInfo(data.data.results) : null
  console.log(characters)

  return (
    <div className="min-h-screen w-full  bg-zinc-900/90 text-zinc-100">
      {characters &&
        characters.map((character) => {
          return (
            <p key={character.id} title={String(character.id)}>
              {character.name}
            </p>
          )
        })}
      <form action="">
        <Atom.Input
          type="search"
          id="search"
          icon={<MagnifyingGlass size={28} weight="duotone" />}
        />
      </form>
    </div>
  )
}
