import { CharacterType } from "@/types/character"
import { CharacterImage } from "../atoms/CharacterImage"
import { CharacterName } from "../atoms/CharacterName"

type Props = {
  character: CharacterType
}

export function CharacterCard({ character }: Props) {
  return (
    <div className="group relative flex h-80 w-44 items-end hover:cursor-pointer">
      <CharacterName name={character.name} />

      <CharacterImage thumbnail={character.thumbnail} />
    </div>
  )
}
