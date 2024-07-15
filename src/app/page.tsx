"use client"
import { useFetchCharacters } from "@/controllers/CharacterController"
import { HomePage } from "@/components/templates/HomePage"
import Image from "next/image"
import marvelCover from "@/assets/marvel_cover.jpeg"

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
      <Image
        src={
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        }
        width={100}
        height={100}
        objectFit="cover"
        alt=""
      />
      <Image
        src={marvelCover}
        width={100}
        height={100}
        objectFit="cover"
        alt=""
      />
      <HomePage data={data || { results: [], total: 0 }} />
    </main>
  )
}
