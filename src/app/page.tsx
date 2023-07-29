"use client";

import React, { use, useCallback, useContext, useMemo, useState } from "react";
import NextImage from "next/image";

import Button from "@/components/atoms/Button";
import CharactersGrid from "@/components/organisms/CharactersGrid";
import Input from "@/components/atoms/Input";
import Pagination from "@/components/molecules/Pagination";
import Select from "@/components/atoms/Select";
import Spinner from "@/components/atoms/Spinner";

import { CharactersContext } from "@/context/CharactersProvider";

import { Character } from "@/entities/Character";

import { Character as CharacterProps } from "@/types/payload";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const limitOptions = [
  {
    label: "10",
    value: 10,
  },
  {
    label: "25",
    value: 25,
  },
  {
    label: "50",
    value: 50,
  },
];

const orderOptions = [
  {
    label: "(A-Z)",
    value: "name",
  },
  {
    label: "(Z-A)",
    value: "-name",
  },
  {
    label: "ANTIGOS",
    value: "modified",
  },
  {
    label: "RECENTES",
    value: "-modified",
  },
];

export default function Home() {
  const {
    characters,
    getCharacters,
    limit,
    loading,
    orderBy,
    search,
    setSearch,
    setCharacters,
    setLimit,
    setOrderBy,
    total,
  } = useContext(CharactersContext);

  const [page, setPage] = useState(1);
  const [searchedCharacters, setSearchedCharacters] = useState<
    CharacterProps[]
  >([]);

  const filterCharacters = useCallback(
    (characters: CharacterProps[], search?: string) => {
      if (!search) {
        return characters
          .slice((page - 1) * limit, page * limit)
          .filter((character) => character !== undefined);
      }

      return characters
        .slice((page - 1) * limit, page * limit)
        .filter((character) => character !== undefined)
        .filter((character) =>
          character.name.toLowerCase().includes(search.toLowerCase())
        );
    },
    [limit, page]
  );

  const charactersFiltered = useMemo(() => {
    if (searchedCharacters.length !== 0) {
      return searchedCharacters;
    }

    if (!search) {
      return filterCharacters(characters);
    }

    return filterCharacters(characters, search);
  }, [characters, filterCharacters, search, searchedCharacters]);

  const handlePagination = useCallback(
    async (newPage: number) => {
      setPage(() => newPage);

      if (
        characters
          .slice(newPage * limit, newPage * limit + limit)
          .every((character) => character === undefined)
      ) {
        const payload = await getCharacters({
          limit,
          offset: newPage * limit,
          ...(orderBy && { orderBy }),
        });

        if (!payload) {
          return;
        }

        setCharacters((characters) => {
          const newCharacters = [...characters];

          payload.data.results.forEach((character, index) => {
            newCharacters[payload.data.offset + index] = new Character(
              character
            );
          });

          return newCharacters;
        });
      }
    },
    [characters, getCharacters, limit, orderBy, page]
  );

  const handleSearch = useCallback(async () => {
    if (loading || !search) {
      return;
    }

    const charactersFiltered = filterCharacters(characters, search);

    if (charactersFiltered.length === 0) {
      const payload = await getCharacters({ nameStartsWith: search });

      if (!payload) {
        return;
      }

      setSearchedCharacters(payload.data.results);
      return;
    }

    setSearchedCharacters([]);
  }, [characters, loading, search]);

  const handleSearchChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearch = e.target.value;

      setSearch(newSearch);
    },
    [characters, filterCharacters, getCharacters, search, searchedCharacters]
  );

  const handleSearchClear = useCallback(() => {
    setSearch("");
    setSearchedCharacters([]);
  }, []);

  const handleSetLimit = useCallback(
    async (newLimit: 10 | 25 | 50) => {
      setLimit(newLimit);
      setPage(1);

      if (limit === newLimit) {
        return;
      }

      if (
        characters
          .slice(newLimit, 2 * newLimit)
          .every((character) => character === undefined)
      ) {
        const payload = await getCharacters({
          limit: newLimit * 2,
          orderBy,
        });

        if (!payload) {
          return;
        }

        setCharacters((characters) => {
          const newCharacters = [...characters];

          payload.data.results.forEach((character, index) => {
            newCharacters[payload.data.offset + index] = new Character(
              character
            );
          });

          return newCharacters;
        });
      }
    },
    [characters, orderBy]
  );

  const handleSetOrder = useCallback(
    async (newOrderBy: "name" | "modified" | "-name" | "-modified") => {
      setOrderBy(newOrderBy);
      setPage(1);

      if (orderBy === newOrderBy) {
        return;
      }

      if (
        (orderBy === "name" && newOrderBy === "-name") ||
        (orderBy === "-name" && newOrderBy === "name")
      ) {
        if (
          characters
            .reverse()
            .slice(0, 2 * limit)
            .every((character) => character === undefined)
        ) {
          const payload = await getCharacters({
            limit: limit * 2,
            orderBy: newOrderBy,
          });

          if (!payload) {
            return;
          }

          setCharacters((characters) => {
            const newCharacters = [...characters.reverse()];

            payload.data.results.forEach((character, index) => {
              newCharacters[payload.data.offset + index] = new Character(
                character
              );
            });

            return newCharacters;
          });

          return;
        }

        setCharacters((characters) => [...characters.reverse()]);

        return;
      }

      if (
        (orderBy === "modified" && newOrderBy === "-modified") ||
        (orderBy === "-modified" && newOrderBy === "modified")
      ) {
        if (
          characters
            .reverse()
            .slice(0, 2 * limit)
            .every((character) => character === undefined)
        ) {
          const payload = await getCharacters({
            limit: limit * 2,
            orderBy: newOrderBy,
          });

          if (!payload) {
            return;
          }

          setCharacters((characters) => {
            const newCharacters = [...characters.reverse()];

            payload.data.results.forEach((character, index) => {
              newCharacters[payload.data.offset + index] = new Character(
                character
              );
            });

            return newCharacters;
          });

          return;
        }

        setCharacters((characters) => [...characters.reverse()]);

        return;
      }

      const payload = await getCharacters({
        limit: limit * 2,
        orderBy: newOrderBy,
      });

      if (!payload) {
        return;
      }

      setCharacters(() => {
        const newCharacters = Array<CharacterProps>();

        payload.data.results.forEach((character, index) => {
          newCharacters[payload.data.offset + index] = new Character(character);
        });

        return newCharacters;
      });
    },
    [limit, orderBy]
  );

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  return (
    <>
      <header className="flex w-full flex-col gap-16">
        <span className="w-fit rounded-md bg-[#ed1d24] p-1 ring-1 ring-red-500 transition-all hover:ring-red-500/75 focus:ring-4">
          <NextImage alt="Marvel" height={32} src="/logo.png" width={32} />
        </span>
        <div className="flex w-full flex-col-reverse items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <Input
              onChange={handleSearchChange}
              onClear={handleSearchClear}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }

                if (e.key === "Escape") {
                  handleSearchClear();
                }
              }}
              placeholder="Filtre por..."
              type="text"
              value={search}
            />
            <Button
              disabled={loading || !search}
              loading={loading}
              icon={<MagnifyingGlassIcon />}
              onClick={handleSearch}
              type="button"
            />
          </div>
          <div className="flex items-center gap-4">
            <Pagination
              {...{
                handlePagination,
                loading,
                page,
                totalPages,
              }}
            />
            <Select
              {...{
                options: limitOptions,
                select: limit,
                setSelect: handleSetLimit,
              }}
            />
            <Select
              {...{
                options: orderOptions,
                select: orderBy,
                setSelect: handleSetOrder,
              }}
            />
          </div>
        </div>
      </header>
      <main className="mx-auto">
        {charactersFiltered.length !== 0 ? (
          <CharactersGrid {...{ characters: charactersFiltered }} />
        ) : loading ? (
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3">
              <Spinner primary="fill-red-500" />
            </span>
            <span className="text-roboto text-xs font-bold text-red-500/75">
              Carregando personagens...
            </span>
          </div>
        ) : (
          <div className="flex">
            <span className="text-roboto text-xs font-bold text-red-500/75">
              Não foi possível encontrar personagens.
            </span>
          </div>
        )}
      </main>
    </>
  );
}
