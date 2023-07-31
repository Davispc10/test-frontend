import { Suspense } from 'react'

import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import { GoBack } from '@/components/go-back'
import { cn } from '@/utils'
import { until } from '@/utils/until'

import { getCharacterById } from '../../api/get-character-by-id'
import { CardListSkeleton } from '../../components/card-list-skeleton'
import { type Character } from '../../schemas'
import { getThumbnailAsString } from '../../utils'
import { CharacterThumbnail } from './components/character-thumbnail'
import { ComicList } from './components/comic-list'
import { NoComicsFound } from './components/no-comics-found'

export const generateMetadata = async ({
  params: { characterId },
}: CharacterDetailsPageProps): Promise<Metadata> => {
  const [error, character] = await until(() => getCharacterById(characterId))

  if (error || !character) {
    return {
      title: 'Character details',
      description: 'Character details',
    }
  }

  const title = `${character.name} | Marvel Characters`

  return {
    title: title,
    description: character.description,
    openGraph: {
      title: title,
      description: character.description,
      url: `https://dinherow-test.gabrielmoraes.dev/characters/${character.id}`,
      images: [
        {
          url: getThumbnailAsString(character.thumbnail),
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: character.description,
    },
  }
}

type CharacterDetailsPageProps = {
  params: {
    characterId: Character['id']
  }
}

export default async function CharacterDetailsPage({
  params: { characterId },
}: CharacterDetailsPageProps) {
  const [error, character] = await until(() => getCharacterById(characterId))

  if (error || !character) {
    return redirect('/')
  }

  const hasComics = character.comics.items.length > 0

  return (
    <main className="container my-10 space-y-10">
      <GoBack />

      <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[auto,1fr] sm:gap-10">
          <h1 className="text-4xl font-semibold sm:hidden">{character.name}</h1>

          <CharacterThumbnail
            thumbnail={getThumbnailAsString(character.thumbnail)}
            name={character.name}
          />

          <div className="">
            <h1 className="mb-4 hidden text-4xl font-semibold sm:block">
              {character.name}
            </h1>
            <p>{character.description}</p>
          </div>
        </div>
      </section>

      <section>
        <h2
          className={cn(
            'relative mb-10 mt-24 text-3xl font-semibold uppercase leading-[0.9] -tracking-[1px]',
            'before:absolute before:-top-[8px] before:left-[53px] before:block before:h-0.5 before:w-5 before:origin-bottom-left before:-rotate-45 before:skew-x-[45deg] before:bg-secondary',
            'after:absolute after:-left-[6px] after:top-[calc(100%+3px)] after:block after:h-0.5 after:w-5 after:origin-top-right after:-rotate-45 after:skew-x-[45deg] after:bg-secondary',
          )}
        >
          Comics
        </h2>

        {hasComics ? (
          <Suspense fallback={<CardListSkeleton amount={10} />}>
            <ComicList characterId={characterId} />
          </Suspense>
        ) : (
          <NoComicsFound />
        )}
      </section>
    </main>
  )
}
