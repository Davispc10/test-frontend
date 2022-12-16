"use client";

import { PaginationContext } from "@contexts/pagination.provider";
import type { CharacterOrderBy } from "@core/domain/adapters/character.adapter";
import { Character, CharacterJSON } from "@core/domain/entities/character";
import { useCharacters } from "@hooks/use-characters";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CharacterCard } from "./character-card.component";

export type CharactersListProps = {
  initialData?: CharacterJSON[] | Character[];
  limit?: number;

  /** Se for falso, então o offset será pego diretamente pela api de paginação */
  offset?: number | false;

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
  offset = false,
  orderBy = "name",
  ...rest
}) => {
  const router = useRouter();
  const [browsing, setBrowsing] = useState(false);

  useEffect(() => {
    setBrowsing(false);
  }, []);

  const { currentPage } = useContext(PaginationContext);

  const { characters, isLoading, isError, error } = useCharacters({
    search: { limit, offset: offset || currentPage?.id * limit || 0, orderBy },
    initialData,
  });

  const classes = twMerge(
    "relative flex justify-center items-center mx-auto p-4 w-full",
    className
  );

  if (isError) return <p>Error: {(error as any).message}</p>;

  return (
    <div {...rest} className={classes}>
      <div className="flex flex-grow flex-wrap justify-start items-center transition duration-1000 ease-linear w-full">
        {!isLoading
          ? characters.map((character, idx) => {
              const href = `/character/${character.id}`;

              return (
                <CharacterCard
                  priority={idx === 0}
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  isLoading={browsing}
                  onClick={() => {
                    if (!browsing) {
                      setBrowsing(true);
                      router.push(href);
                    }
                  }}
                  thumbnail={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                />
              );
            })
          : Array(20)
              .fill(0)
              .map((_, idx) => (
                <CharacterCard
                  key={idx}
                  isLoading
                  id={0}
                  name=""
                  thumbnail={null}
                />
              ))}
      </div>
    </div>
  );
};
