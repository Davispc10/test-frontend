import { CharacterType } from "@/types/character"
import { CharacterCard } from "../molecules/CharacterCard"

type Props = {
  characters: CharacterType[]
}

export function CharactersList({ characters }: Props) {
  return (
    <div className="flex w-11/12 flex-wrap items-center justify-center gap-5">
      {characters.length > 0 ? (
        characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))
      ) : (
        <span className="text-xl text-zinc-100">Lista dos Heróis vazia</span>
      )}
    </div>
  )
}
