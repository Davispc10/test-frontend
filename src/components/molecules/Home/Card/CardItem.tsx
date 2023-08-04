import { Heading } from "@/components/atoms";
import { CharacterProps } from "@/types/CharacterProps"
import Link from "next/link";

interface Props {
    character: CharacterProps;
    renderImage: (character: CharacterProps) => JSX.Element;
}

export const CardItem = ({character, renderImage}: Props) => {
    return (
        <div key={character.id} className="bg-white rounded-lg">
            <Link 
              className="" 
              href={`/character/${character.id}`}>
                <div>
                  {renderImage(character)}
                </div>
                <div className="flex justify-center items-center bg-black h-10 rounded-lg rounded-tl-none rounded-tr-none">
                  <Heading as="h3" className="font-mono text-white text-xs text-center">{character.name}</Heading>
                </div>
              </Link>
          </div>
    )
}