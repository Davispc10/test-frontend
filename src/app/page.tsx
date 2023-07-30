import { Suspense } from 'react'
import { CharactersList } from './components/CharactersList/CharactersList'

interface HomePropsSchema {
  searchParams: {
    page?: string
    search?: string
  }
}

export default async function Home({ searchParams }: HomePropsSchema) {
  return (
    <Suspense fallback={<h1>LOADING...</h1>}>
      <CharactersList page={searchParams.page} search={searchParams.search} />
    </Suspense>
  )
}
