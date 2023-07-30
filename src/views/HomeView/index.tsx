import CharacterCard from "@/components/CharacterCard";
import ErrorInfo from "@/components/ErrorInfo";
import Gallery from "@/components/Gallery";
import LoadSpinner from "@/components/LoadSpinner";
import MyContainer from "@/components/MyContainer";
import Pagination from "@/components/Pagination";
import SearchHeader from "@/components/SearchHeader";
import usePaginationAndSearch from "@/hooks/usePaginationAndSearch";
import { marvelApi } from "@/services/marvelApi";
import { CharactersApiResult } from "@/types/Character";
import { API_LINKS } from "@/utils/apiLinks";
import { APP_PAGES } from "@/utils/appPages";
import { PAGE_SIZE, STALE_TIME } from "@/utils/constants";
import { transformCharactersResponse } from "@/utils/transformResponses";
import { FileSearch } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

interface HomeViewProps {
  resultFromApi: CharactersApiResult;
}

export default function HomeView({ resultFromApi }: HomeViewProps) {
  const { handlePagination, page, debounceText, searchText, setSearchText } =
    usePaginationAndSearch({
      delay: 500,
    });

  const { data, isLoading, isFetching, isError } =
    useQuery<CharactersApiResult>({
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
      <div className="max-w-lg w-full flex justify-center m-auto pb-4">
        <SearchHeader onChange={setSearchText} value={searchText} />
      </div>
      <Gallery
        items={characters}
        render={(character) => (
          <CharacterCard
            key={character.id}
            character={character}
            href={APP_PAGES.characterDetails(character.id)}
          />
        )}
      />
      {!isFetching && debounceText && characters.length === 0 && (
        <p className="text-3xl flex gap-2">
          <FileSearch size={32} />
          No results for &quot;{debounceText}&quot;
        </p>
      )}

      {isError && <ErrorInfo />}

      <div className="py-4 flex justify-end gap-2">
        {isLoading || (isFetching && <LoadSpinner />)}
        <Pagination index={page} onChangePage={handlePagination} size={total} />
      </div>
    </MyContainer>
  );
}
