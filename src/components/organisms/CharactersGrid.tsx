import CharacterCard from "../molecules/CharacterCard";

import { Character as CharacterProps } from "@/types/payload";

export interface Props {
  characters: CharacterProps[];
}

function CharactersGrid({ characters }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard
            {...{
              character,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default CharactersGrid;
