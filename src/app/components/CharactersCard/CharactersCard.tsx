import { getCharacters } from '@/services/characters/charactersService'
import Image from 'next/image'
import Link from 'next/link'

export const CharactersCard = async () => {
  const characters = await getCharacters()

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-5 gap-8 ">
      {characters.data.results.map((character) => (
        <Link
          href={''}
          key={character.id}
          className="group relative overflow-hidden rounded-md after:absolute after:inset-0  after:top-1/2 after:bg-gradient-to-b after:from-[transparent] after:to-black after:transition-all after:duration-300 after:hover:top-0"
        >
          <Image
            height={800}
            width={400}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="aspect-square h-64 w-auto object-cover transition-all duration-300 group-hover:scale-125"
          />
          <h3 className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 font-semibold text-white transition-[bottom] duration-300 group-hover:bottom-1/2">
            {character.name}
          </h3>
        </Link>
      ))}
    </div>
  )
}
