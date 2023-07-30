import { getCharacters } from '@/services/characters/charactersService'
import Image from 'next/image'

export const Characters = async () => {
  const characters = await getCharacters()

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-5 gap-8 ">
      {characters.data.results.map((character) => (
        <div
          key={character.id}
          className="relative overflow-hidden rounded-md after:absolute after:inset-0  after:top-1/2 after:bg-gradient-to-b after:from-[transparent] after:to-black"
        >
          <Image
            height={800}
            width={400}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="aspect-square h-64 w-auto object-cover"
          />
          <h3 className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 font-semibold text-white">
            {character.name}
          </h3>
        </div>
      ))}
    </div>
  )
}
