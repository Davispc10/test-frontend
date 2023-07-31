import { MarvelCharacter } from '@/interfaces/marvelAPI'
import { Atom } from '../atoms'

interface ICardsContainer {
  characters: MarvelCharacter[]
}

export function CardsContainer({ characters }: ICardsContainer) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {characters.map((character) => (
        <Atom.Card key={character.id} character={character} />
      ))}
    </ul>
  )
}
