import { getCharacterComics } from '@/app/(characters)/api/get-character-comics'
import { CardsGrid } from '@/app/(characters)/components/cards-grid'
import { ImageWithTitleCard } from '@/app/(characters)/components/image-with-title-card'
import { type Character, type Comic } from '@/app/(characters)/schemas'
import { getThumbnailAsString } from '@/app/(characters)/utils'
import { until } from '@/utils/until'

import { NoComicsFound } from './no-comics-found'

type ComicListProps = {
  characterId: Character['id']
}

export const ComicList = async ({ characterId }: ComicListProps) => {
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

export const ComicCard = ({ comic }: ComicCardProps) => {
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
