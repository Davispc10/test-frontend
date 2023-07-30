"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "react-query";
import { getDetailHero } from "@/services/hooks/getDetailHero/useDetailHero";
import { Thumbnail } from "./Thumbnail";
import { HeroProps } from "@/app/hero/[id]/page";
import { heroesWithoutDescription } from "@/utils/heroesWithoutDescription";
import { Comics } from "./Comics";
import { HeroesProsps } from "@/types/heroesTypes";

export function HeroDetail({ params }: HeroProps) {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<HeroesProsps[]>({
    retry: false,
    queryKey: ["hero-details", params.id],
    queryFn: () => getDetailHero(params.id),
    staleTime: 1000 * 5,
  });

  const navigateToBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <section className="p-8">
      <div className="grid grid-row-1 place-items-start">
        <button
          className="flex justify-center border-y border-black items-center w-14 my-2 rounded-full bg-red-900 p-2 hover:bg-red-700 duration-100"
          onClick={navigateToBack}
          type="button"
        >
          <ArrowLeft className="text-3xl" />
        </button>
      </div>
      {isLoading ? (
        <p className="flex items-center justify-center font-bold h-48 text-white/95">
          Carregando dados dos Personagens!
        </p>
      ) : error ? (
        <p className="flex items-center justify-center font-bold h-48 text-white/95">
          Falha ao obter dados dos Personagens!😔
        </p>
      ) : (
        <div className="flex justify-around flex-col ">
          {data?.map((detail) => {
            return (
              <div
                key={detail.id}
                className="w-full pt-4 block sm:flex  items-center gap-0 sm:gap-16 pb-8 sm:pb-16"
              >
                <Thumbnail src={detail.thumbnail} width={400} height={400} />

                <div className="pt-6 sm:pt-0 sm:w-3/4 h-auto">
                  <h1 className="text-5xl mb-4 sm:text-7xl font-bold">
                    {detail.name}
                  </h1>
                  <span className="text-lg font-semibold">
                    {heroesWithoutDescription(detail.description)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <h1 className="text-4xl text-center font-bold">Fotos dos Quadrinhos</h1>
        <Comics params={params} />
      </div>
    </section>
  );
}
