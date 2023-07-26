import { CharacterList } from './components/character-list'
import { OrderBySelect } from './components/order-by-select'
import { SearchCharactersInput } from './components/search-characters-input'

export default function Home() {
  return (
    <main className="container mt-10">
      <h1 className="text-4xl font-semibold">Personagens</h1>

      <div className="mt-10 flex items-center justify-between">
        <SearchCharactersInput />
        <OrderBySelect />
      </div>

      <div>
        <CharacterList />
      </div>
    </main>
  )
}
