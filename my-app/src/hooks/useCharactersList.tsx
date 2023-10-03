"use client";

import { useQuery } from "@tanstack/react-query";
import { useDeferredValue } from "react";
import { useSearch } from "../hooks/useSearch";
import fetcher from "services/api";
import { Character } from "types/character";


export function useCharactersList(offset: number) {
  const { search } = useSearch();
  const searchDeferred = useDeferredValue(search.toLowerCase());
  const { data, isLoading } = useQuery({
    queryFn: () => fetcher("characters", { limit: 100, offset: offset }),
    queryKey: ["characters", offset],
  });
  const characters = data?.data?.data?.results;
  const filterCharacters = characters?.filter((character: Character) =>
    character.name.toLowerCase().includes(searchDeferred)
  );

  return { data: filterCharacters, isLoading };
}
