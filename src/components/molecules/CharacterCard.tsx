import { CharacterImage } from "../atoms/CharacterImage"
import { CharacterName } from "../atoms/CharacterName"
import { CharacterType } from "@/types/character"
import Link from "next/link"

type Props = {
  character: CharacterType
}

export function CharacterCard({ character }: Props) {
  return (
    <Link
      href={`/character/${character.id}`}
      className="group relative flex h-80 w-44 items-end hover:cursor-pointer"
    >
      <CharacterName name={character.name} />

      <CharacterImage thumbnail={character.thumbnail} />
    </Link>
  )
}
