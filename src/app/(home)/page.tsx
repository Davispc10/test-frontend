import { CharacterList } from './components/character-list'
import { OrderBySelect } from './components/order-by-select'
import { SearchCharactersInput } from './components/search-characters-input'

export default function Home() {
  return (
    <main className="container mt-10">
      <h1 className="text-4xl font-semibold">Personagens</h1>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchCharactersInput />
        <OrderBySelect />
      </div>

      <CharacterList />
    </main>
  )
}
