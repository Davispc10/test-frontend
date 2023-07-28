"use client";

import { Character, ResultComicsData } from "@/types/global";
import { createContext, useEffect, useState } from "react";
import {
  fetchCharacters,
  fetchDataProps,
  fetchSearch,
} from "@/functions/functions";

interface ContextProps {
  totalCharacters: number;
  setTotalCharacters: (value: number) => void;
  singleCharacter: Character | undefined;
  setSingleCharacter: (value: Character | undefined) => void;
  results: Character[];
  setResults: (value: Character[]) => void;
  offset: number;
  setOffset: (value: number) => void;
  search: string;
  setSearch: (value: string) => void;
  comics: ResultComicsData[];
  setComics: (value: ResultComicsData[]) => void;
  page: number;
  setPage: (value: number) => void;
  lastPage: number;
  setLastPage: (value: number) => void;
}

const initialValue = {
  totalCharacters: 0,
  setTotalCharacters: () => {},
  singleCharacter: undefined,
  setSingleCharacter: () => {},
  results: [],
  setResults: () => {},
  offset: 0,
  setOffset: () => {},
  search: "",
  setSearch: () => {},
  comics: [],
  setComics: () => {},
  page: 1,
  setPage: () => {},
  lastPage: 0,
  setLastPage: () => {},
};

export const Context = createContext<ContextProps>(initialValue);

export const ContextProvider = ({ children }: any) => {
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [results, setResults] = useState<Character[]>([]);
  const [comics, setComics] = useState<ResultComicsData[]>([]);
  const [singleCharacter, setSingleCharacter] = useState<Character>();
  const [offset, setOffset] = useState(20);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchDataProps(offset).then((data) => {
      setTotalCharacters(data.total);
      setPageSize(data.limit);
      setLastPage(Math.ceil(data.total / data.limit));
      setOffset((pageNumber - 1) * data.limit);
    });

    if (search) {
      fetchSearch(search).then((data) => {
        setResults(data);
      });
    } else {
      fetchCharacters(offset).then((data) => {
        setResults(data);
      });
    }
  }, [offset, totalCharacters, pageNumber, search]);

  console.log(search);

  return (
    <Context.Provider
      value={{
        totalCharacters,
        setTotalCharacters,
        singleCharacter,
        setSingleCharacter,
        results,
        setResults,
        offset,
        setOffset,
        search,
        setSearch,
        comics,
        setComics,
        page: pageNumber,
        setPage: setPageNumber,
        lastPage,
        setLastPage,
      }}
    >
      {children}
    </Context.Provider>
  );
};
