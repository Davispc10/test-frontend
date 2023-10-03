"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type SearchProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string | null>>;
  page: string;
  setPage: Dispatch<SetStateAction<string | null>>;
};

type SearchContextProps = {
  search: SearchProps | "";
  setSearch: (value: any) => void;
  page: SearchProps | '';
  setPage: (value: any) => void;
};

export const SearchContext = createContext({} as SearchContextProps);

interface ProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: ProviderProps) => {
  const [search, setSearch] = useState<SearchProps | "">("");
  const [page, setPage] = useState<SearchProps | ''>('');

  return (
    <SearchContext.Provider value={{ search, setSearch, page, setPage }}>
      <>{children}</>
    </SearchContext.Provider>
  );
};
