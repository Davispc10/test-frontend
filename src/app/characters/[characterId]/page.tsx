import { Suspense } from 'react'

import { Container } from '@/components/container'

import { CharactersProps } from '@/@types/characters'
import { QueryParams } from '@/lib/utils'
import { execute } from '@/utils/execute'

import { Character, CharacterSkeleton } from './character'

export async function generateStaticParams() {
  const url = QueryParams.baseUrl('/characters')
    .query({
      query: 'limit',
      value: '50',
    })
    .query({
      query: 'offset',
      value: '1',
    })
    .value()

  const characters = await execute<CharactersProps>(url)

  return characters.data.results.map((character) => ({
    characterId: String(character.id),
  }))
}

type Props = {
  params: {
    characterId: string
  }
}

const CharacterPage = ({ params: { characterId } }: Props) => {
  return (
    <Container>
      <Suspense fallback={<CharacterSkeleton />}>
        <Character character={characterId} />
      </Suspense>
    </Container>
  )
}

export default CharacterPage
