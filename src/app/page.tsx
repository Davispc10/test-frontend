"use client";

import Link from "next/link";
import Image from "next/image";
import { BASE_URL, logoMarvel, privateKey, publicKey } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import axios from "axios";
import { generateMD5Hash } from "@/services/serviceDataApi";
import { ChevronLeft } from "lucide-react";
import { Character } from "@/types/global";
import { Character as Hero } from "@/components/index";

const ts = "1";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const hash = generateMD5Hash("1", privateKey, publicKey);
  const offset = (pageNumber - 1) * pageSize;
  const totalPages = Math.ceil(1562 / pageSize);

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
    axios
      .get(
        `${BASE_URL}?ts=${ts}&offset=${offset}&apikey=${publicKey}&hash=${hash}`
      )
      .then((response) => {
        setCharacters(response.data.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hash, offset, pageNumber]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-5 bg-red-600">
      
      <main className="flex flex-col gap-3 items-center justify-center">
        <form className="flex flex-row justify-center items-center border rounded-md w-96">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 text-xl font-bold text-center text-gray-600 bg-white rounded-l-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          />
          <button
            type="button"
            className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-red-600 rounded-r-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
            <Search size={28} className="mr-2" />
          </button>
        </form>
        <section className="flex flex-row flex-wrap justify-center p-10items-center gap-5">
          {characters.map((character) => (
            <Link key={character.id} href={`/characters/${character.id}`}>
              <Hero {...character} />
            </Link>
          ))}
        </section>
        <footer className="py-5">
          <div className="flex flex-row items-center justify-center gap-5">
            <button
              type="button"
              className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              onClick={handlePreviousClick}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft size={28} className="mr-2" />
            </button>
            <p className="text-white text-center">
              Page {pageNumber} of {totalPages}
            </p>
            <button
              type="button"
              className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              onClick={handleNextClick}
              disabled={pageNumber >= totalPages}
            >
              <ChevronRight size={28} className="mr-2" />
            </button>
          </div>
        </footer>
      </main>
      
    </div>
  );
}
