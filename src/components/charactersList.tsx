import { Characters } from "@/lib/marvel";
import Link from "next/link";

interface CharactersListProps {
  characters: Characters
}

export function CharactersList({characters}:CharactersListProps) {

  return (
    <div className="grid grid-cols-3 gap-12 mb-12 sm:grid-cols-1 sm:gap-3">
        {characters?.map((character) => (
          <Link
            href={`/characters/${character.id}`}
            key={character.id}
            className=""
          >
            <img
              src={character.thumbnail}
              alt=""
              height={280}
              width={260}
              className="aspect-square rounded-lg object-cover"
            />
            <h3 className="pl-2 text-lg font-semibold">{character.name}</h3>
          </Link>
        ))}
      </div>
  );
}
