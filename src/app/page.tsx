import { Suspense } from 'react'
import { Characters } from './components/Characters/Characters'

export default async function Home(props: any) {
  return (
    <main className="">
      <Suspense fallback={<h1>LOADING...</h1>}>
        <Characters />
      </Suspense>
    </main>
  )
}
