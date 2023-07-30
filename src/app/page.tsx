import { Suspense } from 'react'
import { CharactersCard } from './components/CharactersCard/CharactersCard'

export default async function Home(props: any) {
  return (
    <main className="py-14">
      <Suspense fallback={<h1>LOADING...</h1>}>
        <CharactersCard />
      </Suspense>
    </main>
  )
}
