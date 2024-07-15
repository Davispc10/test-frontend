import { useFetchCharacterComics } from "@/controllers/CharacterController"
import { CharacterImage } from "../atoms/CharacterImage"

type Props = {
  characterId: string
}

export function ComicsList({ characterId }: Props) {
  const { data, isLoading, isError, error } =
    useFetchCharacterComics(characterId)

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div
      id="comics-list"
      className="flex h-fit w-full gap-6 overflow-x-auto scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-red-600"
    >
      {data!.map((comic) => (
        <div key={comic.id} className="relative aspect-[9/13.5] min-w-40">
          <CharacterImage thumbnail={comic.thumbnail} isButton={false} />
        </div>
      ))}
    </div>
  )
}
