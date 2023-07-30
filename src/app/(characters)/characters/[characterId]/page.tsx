import { Suspense } from 'react'

import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import { GoBack } from '@/components/go-back'
import { cn } from '@/utils'
import { until } from '@/utils/until'

import { getCharacterById } from '../../api/get-character-by-id-'
import { getCharacterComics } from '../../api/get-character-comics'
import { CardListSkeleton } from '../../components/card-list-skeleton'
import { CardsGrid } from '../../components/cards-grid'
import { ImageWithTitleCard } from '../../components/image-with-title-card'
import { type Character, type Comic } from '../../schemas'
import { getThumbnailAsString } from '../../utils'
import { CharacterThumbnail } from './components/character-thumbnail'

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

  return {
    title: `${character.name}`,
    description: character.description,
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

const NoComicsFound = () => <p className="text-gray-600">No comics found.</p>

type ComicListProps = {
  characterId: Character['id']
}

const ComicList = async ({ characterId }: ComicListProps) => {
  const [, comics = []] = await until(() => getCharacterComics(characterId))

  if (!comics || comics.length === 0) {
    return <NoComicsFound />
  }

  return (
    <CardsGrid>
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </CardsGrid>
  )
}

type ComicCardProps = {
  comic: Comic
}

const ComicCard = ({ comic }: ComicCardProps) => {
  const detailUrl = comic.urls.find((url) => url.type === 'detail')?.url ?? '#'

  return (
    <a href={detailUrl} target="_blank" rel="noreferrer noopener">
      <ImageWithTitleCard
        title={comic.title}
        thumbnail={getThumbnailAsString(comic.thumbnail)}
      />
    </a>
  )
}
