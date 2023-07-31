import { marvelApi } from "@/services/marvelApi";
import { CharactersApiResult } from "@/types/Character";
import { API_LINKS } from "@/utils/apiLinks";
import { PAGE_SIZE } from "@/utils/constants";
import { transformCharactersResponse } from "@/utils/transformResponses";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface UseAllCharactersQueryProps {
  searchText?: string;
  page?: number;
  placeholderData?: CharactersApiResult;
}

export default function useAllCharactersQuery({
  searchText,
  page = 0,
  placeholderData,
}: UseAllCharactersQueryProps) {
  const query = useQuery<CharactersApiResult>({
    queryKey: ["characters", page, searchText],
    keepPreviousData: true,
    placeholderData: () => {
      if (!searchText && page === 0) return placeholderData;
    },
    queryFn: async () => {
      const { data } = await marvelApi.get<CharactersApiResult>(
        API_LINKS.characters,
        {
          params: {
            limit: PAGE_SIZE,
            offset: (page + 1) * PAGE_SIZE - PAGE_SIZE,
            nameStartsWith: searchText ? searchText : undefined,
          },
        }
      );

      return transformCharactersResponse(data);
    },
  });
  return query;
}
