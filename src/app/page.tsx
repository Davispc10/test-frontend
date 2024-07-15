"use client"
import { useFetchCharacters } from "@/controllers/CharacterController"
import { HomePage } from "@/components/templates/HomePage"
import { useEffect, useState } from "react"

export default function Home() {
  const [page, setPage] = useState(0)
  const [keyword, setKeyword] = useState("")
  const { data, isError, isLoading, error, refetch } = useFetchCharacters(
    20 * page,
    keyword,
  )

  function previousPage() {
    setPage(page - 1)
    refetch()
  }

  function nextPage() {
    setPage(page + 1)
    refetch()
  }

  if (isError)
    return (
      <div>
        <p>Error: {error.message} </p>
      </div>
    )

  return (
    <main>
      <HomePage
        data={data || { results: [], total: 0 }}
        previousPage={previousPage}
        nextPage={nextPage}
        page={page}
        isLoading={isLoading}
        setKeyword={setKeyword}
        keyword={keyword}
      />
    </main>
  )
}
