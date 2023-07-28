"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Character } from "@/components/index";
import { pageSize } from "@/constants/constants";
import SearchHeroes from "@/components/SearchHeroes";
import { Context } from "@/context/contextApi";

export default function Home() {
  const { results, page, setPage, offset, setOffset, lastPage, setSearch } =
    useContext(Context);

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
      setOffset(offset - pageSize);
    }
  };

  const handleNextClick = () => {
    if (page < lastPage) {
      setPage(page + 1);
      setOffset(offset + pageSize);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-5">
      <main className="flex flex-col gap-3 items-center justify-center">
        <section className="flex flex-row flex-wrap justify-center p-10 items-center gap-5">
          <div className="px-5 w-full flex flex-row  justify-center items-center">
            <SearchHeroes
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          {results?.map((character) => (
            <Link
              href={`/characters/${character.id}`}
              key={character.id}
              passHref
            >
              <Character {...character} />
            </Link>
          ))}
        </section>
        <div className="flex flex-row items-center justify-center gap-5 py-5">
          <button
            type="button"
            className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            onClick={handlePreviousClick}
            disabled={page <= 1}
          >
            <ChevronLeft size={28} />
          </button>
          <p className="text-red-600 text-center">
            Page {page} of {lastPage}
          </p>
          <button
            type="button"
            className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            onClick={handleNextClick}
            disabled={page >= lastPage}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </main>
    </div>
  );
}
