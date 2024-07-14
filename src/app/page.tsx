"use client"
import { useFetchCharacters } from "@/controllers/CharacterController"
import { HomePage } from "@/components/templates/HomePage"

export default function Home() {
  const { data, isError, isLoading, error } = useFetchCharacters(0)

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
    <main>
      <HomePage data={data || { results: [], total: 0 }} />
    </main>
  )
}
