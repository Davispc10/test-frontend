import CharacterCard from "@/components/CharacterCard";
import Gallery from "@/components/Gallery";
import MyContainer from "@/components/MyContainer";
import Pagination from "@/components/Pagination";
import SearchHeader from "@/components/SearchHeader";
import usePaginationAndSearch from "@/hooks/usePaginationAndSearch";
import { marvelApi } from "@/services/marvelApi";
import { Character, CharactersApiResult } from "@/types/Character";
import { API_LINKS } from "@/utils/apiLinks";
import { PAGE_SIZE, STALE_TIME } from "@/utils/constants";
import { transformCharactersResponse } from "@/utils/transformResponses";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";

interface HomeViewProps {
  resultFromApi: CharactersApiResult;
}

export default function HomeView({ resultFromApi }: HomeViewProps) {
  const { handlePagination, page, debounceText, searchText, setSearchText } =
    usePaginationAndSearch({
      delay: 500,
    });

  const { data, isLoading, isPreviousData } = useQuery<CharactersApiResult>({
    queryKey: ["characters", page, debounceText],
    keepPreviousData: true,
    placeholderData: () => {
      if (!debounceText && page === 0) return resultFromApi;
    },
    queryFn: async () => {
      const { data } = await marvelApi.get<CharactersApiResult>(
        API_LINKS.characters,
        {
          params: {
            limit: PAGE_SIZE,
            offset: (page + 1) * PAGE_SIZE - PAGE_SIZE,
            nameStartsWith: debounceText ? debounceText : undefined,
          },
        }
      );

      return transformCharactersResponse(data);
    },
  });

  const characters = data?.data?.results || [];
  const total = useMemo(
    () => Math.floor((data?.data?.total || 0) / PAGE_SIZE),
    [data?.data?.total]
  );

  return (
    <MyContainer>
      {/* <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      /> */}
      <div className="max-w-lg w-full flex justify-center m-auto py-4">
        <SearchHeader />
      </div>
      <Gallery
        items={characters}
        render={(character) => (
          <CharacterCard character={character} key={character.id} />
        )}
      />
      <div className="py-4 flex justify-end">
        <Pagination index={page} onChangePage={handlePagination} size={total} />
      </div>
    </MyContainer>
  );
}
