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

import { ComicsProps } from '@/@types/characters'
import { execute } from '@/utils/execute'

export const Carousel = async ({ character }: { character: string }) => {
  const findCharacter = await execute<ComicsProps>(`/characters/${character}/comics`)
  const result = findCharacter.data.results
  return (
    <CarouselRoot
      opts={{
        align: 'start',
      }}
      className="w-full px-10 sm:px-0"
    >
      <CarouselContent>
        {result.map((comic) => {
          const imageNotFound = comic.thumbnail.path.includes('image_not_available')
          const urlImage = `${comic.thumbnail.path}.${comic.thumbnail.extension}`

          return (
            <CarouselItem key={comic.id} className="md:basis-1/2 lg:basis-1/4">
              <Card className="relative h-96 w-full overflow-hidden rounded-md">
                <Image
                  src={!imageNotFound ? urlImage : '/default-image.jpeg'}
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
