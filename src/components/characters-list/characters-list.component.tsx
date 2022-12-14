"use client";

import type { CharacterOrderBy } from "@core/domain/adapters/character.adapter";
import { Character, CharacterJSON } from "@core/domain/entities/character";
import { useCharacters } from "@hooks/use-characters";
import { twMerge } from "tailwind-merge";
import { CharacterCard } from "./character-card.component";

export type CharactersListProps = {
  initialData?: CharacterJSON[] | Character[];
  limit?: number;
  offset?: number;
  orderBy?: CharacterOrderBy;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Lista os characters da Marvel.
 * Usa o caso de uso: ListCharactersUseCase
 * É um componente cliente.
 */
export const CharactersList: React.FC<CharactersListProps> = ({
  initialData,
  className,
  limit = 20,
  offset = 0,
  orderBy = "name",
  ...rest
}) => {
  const { characters, isLoading, isError, error } = useCharacters({
    search: { limit, offset, orderBy },
    initialData,
  });

  const classes = twMerge(
    "relative flex justify-center items-center mx-auto p-4 w-full",
    className
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as any).message}</p>;

  return (
    <div {...rest} className={classes}>
      <div className="flex flex-grow flex-wrap justify-start items-center transition duration-1000 ease-linear w-full">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            thumbnail={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          />
        ))}
      </div>
    </div>
  );
};
