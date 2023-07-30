import { Suspense } from 'react'
import { Filters } from './components/Filters/Filters'
import { HomePropsSchema } from './page.schema'
import { CharactersList } from './components/CharactersList/CharactersList'

export default async function Home({ searchParams }: HomePropsSchema) {
  return (
    <>
      <Filters />
      <CharactersList page={searchParams.page} search={searchParams.search} />
    </>
  )
}
