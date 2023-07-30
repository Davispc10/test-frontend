"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import React, { useQuery } from "react-query";
import { Search } from "lucide-react";
import { getHeroesSearch } from "@/services/hooks/getHeroesSearch/useHeroesSeach";

export function HeroesSearch() {
  const [search, setSearch] = useState<string>("");

  const { data, refetch } = useQuery({
    queryKey: ["search-heroes"],
    queryFn: () => getHeroesSearch(search),
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGetData = () => {
    void refetch();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void refetch();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-9 flex justify-center items-center rounded-md  w-full shadow-md"
      >
        <input
          name="search-hero"
          type="text"
          placeholder="search your Hero..."
          className="w-full p-3 text-xl font-semibold text-left text-gray-600 bg-white rounded-l-md focus:outline-none"
          onChange={handleInput}
          value={search}
        />
        <button
          onClick={handleGetData}
          type="submit"
          className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-zinc-600 rounded-r-md hover:bg-zinc-500 focus:outline-none"
        >
          <Search size={28} />
        </button>
      </form>
    </>
  );
}
