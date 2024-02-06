import { Suspense } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

import { FindCharacterProps } from '@/@types/characters'
import { execute } from '@/utils/execute'

import { Carousel, CarrouselSkeleton } from './carousel'

type Props = {
  character: string
}

export const Character = async ({ character }: Props) => {
  const findCharacter = await execute<FindCharacterProps>(`/characters/${character}`)
  const result = findCharacter.data.results[0]

  const imageNotFound = result.thumbnail.path.includes('image_not_available')
  const urlImage = `${result.thumbnail.path}.${result.thumbnail.extension}`

  return (
    <div className="space-y-10">
      <div>
        <Avatar className="mx-auto h-36 w-36 md:h-80 md:w-80">
          <AvatarImage
            src={!imageNotFound ? urlImage : '/default-image.jpeg'}
            width={200}
            height={200}
            alt={result.name}
          />
          <AvatarFallback>{result.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="space-y-3">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{result.name}</h1>
          <p>{result.description || 'Descrição não disponível para este personagem'}</p>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Quadrinhos em que {result.name} aparece
        </h2>
        <Suspense fallback={<CarrouselSkeleton />}>
          <Carousel character={character} />
        </Suspense>
      </div>
    </div>
  )
}

export const CharacterSkeleton = () => {
  return (
    <div className="space-y-10">
      <div>
        <Skeleton className="mx-auto h-36 w-36 rounded-full md:h-80 md:w-80" />

        <div className="space-y-3">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <Skeleton className="h-14 w-1/5" />
          </h1>
          <p>
            <Skeleton className="h-4 w-full" />
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-9 w-1/3 scroll-m-20" />
        <CarrouselSkeleton />
      </div>
    </div>
  )
}
