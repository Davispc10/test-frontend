"use client";

import { HeroProps } from "@/app/hero/[id]/page";
import { getComics } from "@/services/hooks/getDetailHero/useDetailHero";
import { useQuery } from "react-query";
import { Thumbnail } from "./Thumbnail";
import { ComicsProps } from "@/types/heroesTypes";

export function Comics({ params }: HeroProps) {
  const { data, isLoading, error } = useQuery<ComicsProps[]>({
    retry: false,
    queryKey: ["comics", params.id],
    queryFn: () => getComics(params.id),
    refetchOnMount: "always",
    staleTime: 1000 * 5,
  });

  return (
    <section className="pt-8">
      {isLoading ? (
        <p className="flex items-center justify-center font-bold h-48 text-white/95">
          Carregando dados dos Personagens!
        </p>
      ) : error ? (
        <p className="flex items-center justify-center font-bold h-48 text-white/95">
          Falha ao obter dados dos Personagens!😔
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-5 items-end gap-4">
          {data?.map((comic) => {
            return (
              <Thumbnail
                key={comic.id}
                src={comic.thumbnail}
                width={250}
                height={250}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
