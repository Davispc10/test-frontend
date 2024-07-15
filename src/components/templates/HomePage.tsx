import { CharacterType } from "@/models/character"
import { Footer } from "../molecules/Footer"
import { PaginationBar } from "../molecules/PaginationBar"
import { SearchBar } from "../molecules/SearchBar"
import { CharactersList } from "../organisms/CharactersList"
import { Loading } from "../atoms/Loading"

type Props = {
  data: {
    results: CharacterType[]
    total: number
  }
  page: number
  previousPage: () => void
  nextPage: () => void
  isLoading: boolean
}

export function HomePage({
  data,
  page,
  nextPage,
  previousPage,
  isLoading,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <SearchBar />

      <PaginationBar
        totalPages={Math.ceil(data.total / 20)}
        nextPage={nextPage}
        previousPage={previousPage}
        page={page}
      />

      {isLoading ? <Loading /> : <CharactersList characters={data.results} />}

      <PaginationBar
        totalPages={Math.ceil(data.total / 20)}
        nextPage={nextPage}
        previousPage={previousPage}
        page={page}
      />

      <Footer />
    </div>
  )
}
