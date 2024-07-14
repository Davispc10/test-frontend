import { CharacterType } from "@/types/character"
import { Footer } from "../molecules/Footer"
import { Header } from "../molecules/Header"
import { PaginationBar } from "../molecules/PaginationBar"
import { SearchBar } from "../molecules/SearchBar"
import { CharactersList } from "../organisms/CharactersList"

type Props = {
  data: {
    results: CharacterType[]
    total: number
  }
}

export function HomePage({ data }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <SearchBar />

      <PaginationBar totalPages={Math.ceil(data.total / 20)} />

      <CharactersList characters={data.results} />

      <PaginationBar totalPages={Math.ceil(data.total / 20)} />

      <Footer />
    </div>
  )
}
