import { useRouter } from 'next/navigation'
import {
  useCharacterById,
  useComicsByCharacterId,
} from '@/lib/react-query/queries/characters'
import { Organism } from '../organisms'
import {
  fixNotAvailableInfoCharacter,
  fixNotAvailableInfoComics,
} from '@/utils'
import { Molecule } from '../molecules'

interface IMainDetail {
  id: number
}

export function MainDetail({ id }: IMainDetail) {
  const router = useRouter()
  const { data } = useCharacterById({ id })
  const { data: comics } = useComicsByCharacterId({ id })

  const character = data
    ? fixNotAvailableInfoCharacter(data.data.results[0])
    : null

  const comicsFormatted = comics
    ? fixNotAvailableInfoComics(comics.data.results)
    : []

  return (
    <div className="main-bg h-full min-h-screen w-full bg-cover bg-fixed bg-center">
      <Organism.Header isDetail comeBack={() => router.back()} />
      <main className="mx-auto min-h-screen max-w-7xl px-4 pb-4 pt-32">
        {character ? <Molecule.CardContainer character={character} /> : null}
        <h2 className="mt-8 text-center font-accent text-3xl lg:text-5xl">
          Comics
        </h2>
        <div className="my-8">
          {comicsFormatted ? (
            <Molecule.CardsComicContainer comics={comicsFormatted} />
          ) : null}
        </div>
      </main>
      <Organism.Footer />
    </div>
  )
}
