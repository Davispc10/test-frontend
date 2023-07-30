import { Suspense } from 'react'
import { CharactersList } from './components/CharactersList/CharactersList'

interface HomePropsSchema {
  searchParams: {
    page: string
  }
}

export default async function Home(props: HomePropsSchema) {
  return (
    <Suspense fallback={<h1>LOADING...</h1>}>
      <CharactersList page={props.searchParams.page} />
    </Suspense>
  )
}
