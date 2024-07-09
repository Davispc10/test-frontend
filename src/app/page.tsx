"use client";

import Loading from "@/components/molecules/Loading";
import CardList from "@/components/organisms/CardList";
import CharacterForm from "@/components/organisms/CharacterForm";
import SkeletonTemplate from "@/components/templates/SkeletonTemplate";
import { L_ELLIPISIS, R_ELLIPISIS } from "@/constants/Ellipisis";
import { usePagination } from "@/hooks/usePagination";
import { fetchCharacters } from "@/libs/fetchCharacters";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function Home() {
  const params = useSearchParams();

  const searchByName = params.get("searchByName") as string | undefined;
  const pageNumber = params.get("page") as string | undefined;

  const { data, isLoading, refetch } = useQuery("characters", () =>
    fetchCharacters({
      limit: 20,
      offset: Number(pageNumber),
      nameStartsWith: searchByName,
    })
  );

  useEffect(() => {
    if (searchByName) {
      refetch();
    }
  }, [searchByName, refetch]);

  const { pages, isCurrentPage } = usePagination(
    Number(data?.offset),
    Number(data?.limit),
    Number(data?.total)
  );

  console.log(pages);
  if (isLoading) {
    return <SkeletonTemplate />;
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <CharacterForm searchByName={searchByName} />
      <div className="flex flex-wrap gap-6 justify-center">
        <CardList data={data?.results} />
      </div>
      <ul className="bg-slate-200 flex mt-8 w-fit gap-3">
        {pages.map((page) => {
          if (page === L_ELLIPISIS || page === R_ELLIPISIS) {
            return (
              <li key={page} className="p-2 w-10 cursor-default">
                ...
              </li>
            );
          }
          return (
            <li
              className={
                isCurrentPage(page)
                  ? "p-2 bg-slate-600 w-10 cursor-pointer mx-auto text-center text-neutral-50"
                  : "w-10 mx-auto text-center cursor-pointer p-2"
              }
              key={page}
            >
              <a
                href={`/?searchByName=${
                  searchByName ? searchByName : ""
                }&page=${page}`}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
