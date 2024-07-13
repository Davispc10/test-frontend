"use client"
import { useState } from "react"
import { useFetchCharacters } from "@/controllers/CharacterController"
import { CharactersList } from "@/components/organisms/CharactersList"
import { PaginationBar } from "@/components/molecules/PaginationBar"
import { SearchBar } from "@/components/molecules/SearchBar"
import { Header } from "@/components/molecules/Header"
import { Footer } from "@/components/molecules/Footer"

export default function Home() {
  const [page, setPage] = useState(1)
  const { data, isError, isLoading, error } = useFetchCharacters(
    20 * (page - 1),
  )

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    )

  if (isError)
    return (
      <div>
        <p>Error: {error.message} </p>
      </div>
    )

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Header />

      <SearchBar />

      {data && <PaginationBar totalPages={Math.ceil(data.total / 20)} />}

      <CharactersList characters={data ? data.results : []} />

      {data && <PaginationBar totalPages={Math.ceil(data.total / 20)} />}

      <Footer />
    </main>
  )
}
