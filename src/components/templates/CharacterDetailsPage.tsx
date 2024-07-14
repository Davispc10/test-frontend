import { DetailsHeader } from "@/components/molecules/DetailsHeader"
import { CharacterDetails } from "@/components/organisms/CharacterDetails"
import { CharacterType } from "@/types/character"

type Props = {
  character: CharacterType
}

export function CharacterDetailsPage({ character }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-start">
      <DetailsHeader title="Character" />

      <CharacterDetails character={character} />
    </div>
  )
}
