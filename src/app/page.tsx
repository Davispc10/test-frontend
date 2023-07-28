"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Character } from "@/types/global";
import { Character as Hero } from "@/components/index";
import { fetchCharacters, fetchSearchCharacters } from "@/functions/functions";
import { hash, pageSize, totalPages } from "@/constants/constants";
import SearchHeroes from "@/components/SearchHeroes";
import { useSearch } from "@/hooks/useSearchHeroes";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchCharacters, setSearchCharacters] = useState<Character[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const offset = (pageNumber - 1) * pageSize;
  const { search, results, loading } = useSearch();
    
  const handlePreviousClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    fetchCharacters(offset).then((data) => setCharacters(data));
  }, [pageNumber, offset, hash, totalPages]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-5">
      <main className="flex flex-col gap-3 items-center justify-center">
        <SearchHeroes
          onChange={(event) => {
            search(event.target.value);
          }}
        />
        <section className="flex flex-row flex-wrap justify-center p-10items-center gap-5">
          {characters.map((character) => (
            <Link
              href={`/characters/${character.id}`}
              key={character.id}
              passHref
            >
              <Hero {...character} />
            </Link>
          ))}
        </section>
        <div className="flex flex-row items-center justify-center gap-5 py-5">
          <button
            type="button"
            className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            onClick={handlePreviousClick}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft size={28} />
          </button>
          <p className="text-red-600 text-center">
            Page {pageNumber} of {totalPages}
          </p>
          <button
            type="button"
            className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            onClick={handleNextClick}
            disabled={pageNumber >= totalPages}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </main>
    </div>
  );
}
