import { CharacterType } from "@/types/character"
import { CharacterImage } from "../atoms/CharacterImage"
import { ComicsList } from "./ComicsList"

type Props = {
  character: CharacterType
}

export function CharacterDetails({ character }: Props) {
  return (
    <div
      id="character-details-card"
      className="mt-4 flex w-4/5 items-center justify-between gap-8 rounded-xl bg-red-900 p-8 shadow shadow-white"
    >
      <div className="relative size-96 shadow shadow-black">
        <CharacterImage thumbnail={character.thumbnail} isButton={false} />
      </div>

      <div className="flex size-96 h-fit flex-1 flex-col items-center gap-4">
        <p className="text-3xl font-bold">{character.name}</p>
        <p className="px-8 text-base text-zinc-200">
          {character.description || "----------"}
        </p>

        <ComicsList characterId={character.id} />
      </div>
    </div>
  )
}
