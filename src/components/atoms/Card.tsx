import Image from 'next/image'

import { MarvelCharacter } from '@/interfaces/marvelAPI'

interface ICard {
  character: MarvelCharacter
}

export function Card({ character }: ICard) {
  const { id, name, thumbnail } = character

  return (
    <article className="card-hover relative isolate flex max-h-44 flex-col justify-end overflow-hidden rounded-2xl border border-transparent bg-gray-900 px-8 pb-8 pt-80 hover:border hover:border-accent sm:pt-48 lg:pt-80">
      <Image
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={name}
        height={500}
        width={500}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <h3 className="mt-3 font-display text-lg leading-6 text-white">
        <a href={`/character/${id}`}>
          <span className="absolute inset-0" />
          {name}
        </a>
      </h3>
    </article>
  )
}
