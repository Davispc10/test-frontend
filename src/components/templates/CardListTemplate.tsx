"use client";
import { fetchCharacters } from "@/libs/fetchCharacters";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import CardList from "../organisms/CardList";
import { L_ELLIPISIS, R_ELLIPISIS } from "@/constants/Ellipisis";
import { usePagination } from "@/hooks/usePagination";
import { ICharacterDataContainer } from "@/interfaces/Characters";
import Link from "next/link";
import SkeletonCardList from "../organisms/SkeletonCardList";

const CardListTemplate = ({
  initData,
}: {
  initData: ICharacterDataContainer;
}) => {
  const params = useSearchParams();

  const searchByName = params.get("searchByName") as string | undefined;
  const pageNumber = params.get("page") as string | undefined;

  const { data, refetch, isFetching } = useQuery(
    "characters",
    () =>
      fetchCharacters({
        limit: 10,
        offset: Number(pageNumber),
        nameStartsWith: searchByName,
      }),
    {
      initialData: initData,
    }
  );

  useEffect(() => {
    if (searchByName || pageNumber) {
      refetch();
    }
  }, [searchByName, pageNumber]);

  const { pages, isCurrentPage } = usePagination(
    Number(data?.offset),
    Number(data?.limit),
    Number(data?.total)
  );

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-wrap gap-6 justify-center">
        {isFetching ? <SkeletonCardList /> : <CardList data={data?.results} />}
      </div>
      <ul className="bg-slate-200 flex w-fit gap-3">
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
                  ? " bg-slate-600 w-10 cursor-pointer block mx-auto text-center text-neutral-50"
                  : "w-10 hover:bg-slate-300 mx-auto block text-center cursor-pointer "
              }
              key={page}
            >
              <Link
                className="block p-2 w-full h-full"
                href={`/?searchByName=${
                  searchByName ? searchByName : ""
                }&page=${page}`}
              >
                {page}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CardListTemplate;
