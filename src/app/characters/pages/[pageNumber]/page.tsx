'use client'
import { CharactersList } from "@/components/charactersList";
import { Pagination } from "@/components/pagination";
import { SearchForm } from "@/components/searchForm";
import { useAppSelector } from "@/redux/store";

interface PageProps {
  params: {
    pageNumber: number;
  };
}

export default function Characters({ params }: PageProps) {
  const page = Number(params.pageNumber);

  const characters = useAppSelector((state) => state.charactersMarvel.characters)

  return (
    <main className="w-screen min-h-[88vh] py-8 flex flex-col gap-8 items-center relative">
      <span className="flex sm:flex-col sm:gap-3 items-center justify-around w-full mb-3 relative">
        <a href="./1" className="text-6xl font-bold px-2 text-white">Characters</a>
          <SearchForm />
      </span>
      <CharactersList characters={characters[page-1]}/>
      <Pagination page={page} arrayPages={characters}/>
    </main>
  );
}
