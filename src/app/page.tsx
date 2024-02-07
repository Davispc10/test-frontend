import { Suspense } from 'react'

import { ListCharacters, ListCharactersProps, ListCharactersSkeleton } from './list-characters'

const Home = async ({ searchParams }: ListCharactersProps) => {
  return (
    <main>
      <Suspense fallback={<ListCharactersSkeleton />}>
        <ListCharacters searchParams={searchParams} />
      </Suspense>
    </main>
  )
}

export default Home
