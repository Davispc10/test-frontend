import { MarvelCharacter } from '@/interfaces/marvelAPI'
import { Atom } from '../atoms'

interface ICardContainer {
  character: MarvelCharacter
}

export function CardContainer({ character }: ICardContainer) {
  return (
    <div className="grid grid-cols-1 px-4 lg:grid-cols-2 ">
      <div className="px-1 lg:px-16">
        <Atom.Card character={character} isDetail />
      </div>
      <div>
        <Atom.InfoCharacter character={character} />
      </div>
    </div>
  )
}
