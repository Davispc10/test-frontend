import Image from 'next/image'

import { Card } from '@/components/ui/card'
import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'

import { findComicsByCharacter } from '@/app/actions/find-comics-by-character'
import { defaultImage } from '@/consts'
import { query } from '@/lib/query'

type CarouselProps = {
  characterId: string
}

export const Carousel = async ({ characterId }: CarouselProps) => {
  const handle = query(findComicsByCharacter)
  const comics = await handle({ characterId }, [`comics-${characterId}`])

  return (
    <CarouselRoot
      opts={{
        align: 'start',
      }}
      className="w-full px-10 sm:px-0"
    >
      <CarouselContent>
        {comics.map((comic) => {
          const imageNotFound = comic.thumbnail.path.includes('image_not_available')
          const urlImage = `${comic.thumbnail.path}.${comic.thumbnail.extension}`

          return (
            <CarouselItem key={comic.id} className="md:basis-1/2 lg:basis-1/4">
              <Card className="relative h-96 w-full overflow-hidden rounded-md">
                <Image
                  src={!imageNotFound ? urlImage : defaultImage}
                  alt=""
                  fill
                  className="object-cover object-center"
                />
              </Card>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselRoot>
  )
}

export const CarrouselSkeleton = () => {
  return (
    <div className="relative flex gap-3">
      <div className="w-full md:basis-1/2 lg:basis-1/4">
        <Skeleton className="relative h-96 w-full overflow-hidden rounded-md" />
      </div>
      <div className="hidden w-full sm:block md:basis-1/2 lg:basis-1/4">
        <Skeleton className="relative h-96 w-full overflow-hidden rounded-md" />
      </div>
      <div className="hidden w-full lg:block lg:basis-1/4">
        <Skeleton className="relative h-96 w-full overflow-hidden rounded-md" />
      </div>
      <div className="hidden w-full lg:block lg:basis-1/4">
        <Skeleton className="relative h-96 w-full overflow-hidden rounded-md" />
      </div>
    </div>
  )
}
