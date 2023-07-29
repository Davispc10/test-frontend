"use client";

import { Header } from "@/components/Header";
import { HeroesCard } from "@/components/HeroesCard";
import { HeroesSearch } from "@/components/Search";
import { useHeroes } from "@/services/hooks/getHeroes/useHeroes";

export default function Home() {
  const { data, isLoading, error } = useHeroes();
  return (
    <section>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24">
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
          <HeroesCard heroes={data} />
        )}
      </main>
    </section>
  );
}
