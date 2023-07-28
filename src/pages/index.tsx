import { useFetchAllCharacters } from '@/lib/react-query/queries/characters'

export default function Home() {
  const { data } = useFetchAllCharacters(3)
  console.log(data)

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-zinc-100">
      <h1>Hello Marvel App</h1>
    </div>
  )
}
