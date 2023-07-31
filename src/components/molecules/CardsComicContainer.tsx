import { Comic } from '@/interfaces/marvelAPI'
import { Atom } from '../atoms'

interface ICardsComicContainer {
  comics: Comic[]
}

export function CardsComicContainer({ comics }: ICardsComicContainer) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    >
      {comics.map((comic) => (
        <Atom.CardComic key={comic.id} comic={comic} />
      ))}
    </ul>
  )
}
