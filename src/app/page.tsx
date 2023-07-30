import { Suspense } from 'react'
import { CharactersList } from './components/CharactersList/CharactersList'
import { Filters } from './components/Filters/Filters'
import { HomePropsSchema } from './page.schema'

export default async function Home({ searchParams }: HomePropsSchema) {
  return (
    <>
      <Filters />
      <Suspense fallback={<h1>LOADING...</h1>}>
        <CharactersList page={searchParams.page} search={searchParams.search} />
      </Suspense>
    </>
  )
}
