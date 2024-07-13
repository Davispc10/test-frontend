"use client"
import { useFetchCharacters } from "@/controllers/CharacterController"

export default function Home() {
  const { data, isError, isLoading, error } = useFetchCharacters()

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
    <main className="flex min-h-screen flex-col items-center justify-center">
      Marvel App
      {data ? (
        <div>
          <span>{data.total}</span>
          {data.results.map((character) => (
            <div key={character.id}>
              <p>{character.name}</p>
              <ul>
                <li>{character.thumbnail.path}</li>
                <li>{character.comics.available}</li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <span>Lista dos Herois vazia</span>
      )}
      <div className="p-2 pt-4"></div>
    </main>
  )
}
