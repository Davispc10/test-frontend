"use client"
import { useFetchCharacter } from "@/controllers/CharacterController"
import { CharacterDetailsPage } from "@/components/templates/CharacterDetailsPage"

type Props = {
  params: { id: string }
}

export default function Character({ params }: Props) {
  const characterQuery = useFetchCharacter(params.id)

  if (characterQuery.isLoading) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center">
        <p className="text-lg text-zinc-200">Loading...</p>
      </div>
    )
  }

  if (characterQuery.isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-md text-zinc-200">
          Error: {characterQuery.error.message}
        </p>
      </div>
    )
  }

  return (
    <main>
      <CharacterDetailsPage character={characterQuery.data!.results[0]} />
    </main>
  )
}
