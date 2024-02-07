import { Suspense } from 'react'

import { Container } from '@/components/container'

import { CharacterEntity } from '@/domain/characters/enterprise/characters.entity'
import { execute } from '@/utils/execute'

import { Carousel, CarrouselSkeleton } from './carousel'
import { Character, CharacterSkeleton } from './character'

export async function generateStaticParams() {
  const characters = await execute<CharacterEntity>({ page: '1' })

  return characters.data.results.map((character) => ({
    characterId: String(character.id),
  }))
}

type Props = {
  params: {
    characterId: string
  }
}

const CharacterPage = ({ params }: Props) => {
  return (
    <Container>
      <div className="space-y-10">
        <Suspense fallback={<CharacterSkeleton />}>
          <Character {...params} />
        </Suspense>
        <div className="space-y-3">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Quadrinhos em que aparece
          </h2>
          <Suspense fallback={<CarrouselSkeleton />}>
            <Carousel {...params} />
          </Suspense>
        </div>
      </div>
    </Container>
  )
}

export default CharacterPage
