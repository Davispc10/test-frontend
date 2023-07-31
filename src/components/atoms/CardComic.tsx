import { Comic } from '@/interfaces/marvelAPI'
import Image from 'next/image'

interface ICardComic {
  comic: Comic
}
export function CardComic({ comic }: ICardComic) {
  const { thumbnail, title } = comic
  return (
    <article className="card-hover max-w-40 relative isolate flex max-h-44 flex-col justify-end overflow-hidden rounded-lg border border-transparent bg-gray-900 px-8 pb-8 pt-80 hover:border hover:border-accent sm:pt-48 lg:pt-80">
      <Image
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={title || ''}
        height={500}
        width={500}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
    </article>
  )
}
