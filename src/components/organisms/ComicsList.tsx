import { useFetchCharacterComics } from "@/controllers/CharacterController"
import { CharacterImage } from "../atoms/CharacterImage"

type Props = {
  characterId: string
}

export function ComicsList({ characterId }: Props) {
  const characterComicsQuery = useFetchCharacterComics(characterId)

  return (
    <div
      id="comics-list"
      className="flex h-fit w-full gap-6 overflow-x-auto scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-red-600"
    >
      {characterComicsQuery.data?.results.map((comic) => (
        <div key={comic.id} className="relative aspect-[9/13.5] min-w-40">
          <CharacterImage thumbnail={comic.thumbnail} isButton={false} />
        </div>
      ))}
    </div>
  )
}
