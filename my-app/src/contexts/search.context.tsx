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
};

type SearchContextProps = {
  search: SearchProps | "";
  setSearch: (value: any) => void;
};

export const SearchContext = createContext({} as SearchContextProps);

interface ProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: ProviderProps) => {
  const [search, setSearch] = useState<SearchProps | "">("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <>{children}</>
    </SearchContext.Provider>
  );
};
