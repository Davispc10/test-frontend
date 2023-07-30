"use client";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Header } from "@/components/Header";
import { HeroesCard } from "@/components/HeroesCard";
import { Pagination } from "@/components/Pagination";
import { HeroesSearch } from "@/components/Search";
import { getAllHeroes } from "@/services/hooks/getAllHeroes/useGetAllHeroes";
import { HeroesProsps } from "@/types/heroesTypes";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;
  const offset: number = itemsPerPage * currentPage - 10;

  const { data, error, isLoading } = useQuery({
    queryKey: ["all-heroes", currentPage],
    queryFn: () => getAllHeroes(offset, itemsPerPage, search),
    onSuccess: (result) => {
      setTotalPages(result.total);
    },
  });

  useEffect(() => {
    setTotalPages(data?.data?.total);
  }, [data]);

  return (
    <section>
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center p-6 sm:p-24">
        <HeroesSearch />
        {isLoading ? (
          <p className="flex items-center justify-center font-bold h-48 text-white/95">
            Carregando dados dos Personagens!
          </p>
        ) : error ? (
          <p className="flex items-center justify-center font-bold h-48 text-white/95">
            Falha ao obter dados dos Personagens!😔
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
              {data &&
                data?.results.map((hero: HeroesProsps) => (
                  <HeroesCard {...hero} key={hero.id} />
                ))}
            </div>
            <Pagination
              totalCountOfRegisters={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </section>
  );
}
