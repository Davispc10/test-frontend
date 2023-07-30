'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pages from "@/components/Pages";
import api from "@/utils/api";
import CharactersSection from "@/components/CharactersSection";

interface CharactersResponse {
  id: number
  name: string
  description: string
  thumbnail: { path: string, extension: string }
}

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const characterSection = useRef<null | HTMLDivElement>(null);
  const resultsQuantity = 20;

  useEffect(() => {
    getData(1);
    setCurrentPage(1);
  }, []);

  const getData = async (pageNumber: number) => {
    try {
      const offset = pageNumber * resultsQuantity - 20;
      const apiConfig = { params: { apikey: "536aa255c37daff2b3be4d672ab76dfb", limit: resultsQuantity, offset } };
      const { data: { data: { results, total } } } = await api.get("/characters", apiConfig);

      setData(results);
      setTotalPages(Math.ceil(total / resultsQuantity));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getCharacter = async (characterName: string) => {
    try {
      setIsLoading(true);
      scrollToCharacters();
      const apiConfig = { params: { apikey: "536aa255c37daff2b3be4d672ab76dfb", name: characterName } };
      const { data: { data: { results, total } } } = await api.get("/characters", apiConfig);

      setData(results);
      setTotalPages(Math.ceil(total / resultsQuantity));

      if (results.length == 0) {
        setCurrentPage(0);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const scrollToCharacters = () => {
    if (characterSection && characterSection.current) {
      characterSection.current.scrollIntoView();
    }
  }

  const handlePageChange = (pageNumber: number) => {
    scrollToCharacters();

    if (pageNumber > 0 && pageNumber <= totalPages) {
      setIsLoading(true);
      getData(pageNumber);
      setCurrentPage(pageNumber);
    }
  }

  const characters = data.map(({ id, name, description, thumbnail: { path, extension } }: CharactersResponse) => {
    const character = {
      id,
      name,
      description: description ? description : "Descrição não informada.",
      imageSource: path.includes("image_not_available") ? "/marvel-logo.svg" : `${path}.${extension}`
    }

    return character;
  });

  return (
    <main className="h-screen">
      <section className="h-4/6 bg-marvel-background bg-center bg-cover marvel-background flex">

        <div className="w-full flex flex-col items-center justify-center">

          <div className="text-8xl font-medium font-mono text-center mb-12">
            <h1>CONFIRA TODOS OS</h1>
            <h1>PERSONAGENS DA MARVEL</h1>
          </div>

          <div className="flex w-3/5 justify-between h-12 gap-4 text-slate-200">
            <div className="w-full flex items-center item">
              <Image src="/lupa.svg" width={30} height={30} alt="Icone lupa" className="absolute ml-3" />
              <input value={search} onChange={e => setSearch(e.target.value)} className="w-full h-full pl-14 px-4 rounded-md border focus:border-neutral-400 hover:border-neutral-400 outline-none  transition-colors border-neutral-600 bg-neutral-800 "
                placeholder="Pesquisar pelo nome do personagem..." />
            </div>
            <button onClick={() => getCharacter(search)} className="bg-red-600 rounded-md px-8 hover:bg-red-700 font-medium transition-colors">Buscar</button>
          </div>

        </div>

      </section>

      <section ref={characterSection} className="bg-neutral-950 px-48 py-24">

        <CharactersSection isLoading={isLoading} characters={characters} />

        <Pages totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

      </section>
    </main>
  );
}