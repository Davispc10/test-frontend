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
import PaginationTemplate from "./PaginationTemplate";

const CardListTemplate = ({
  initData,
}: {
  initData: ICharacterDataContainer;
}) => {
  const params = useSearchParams();

  const searchByName = params.get("searchByName") as string | undefined;
  const pageNumber = params.get("page") as string | undefined;

  const currentPage = pageNumber ? Number(pageNumber) - 1 : 0;

  const { data, refetch, isFetching } = useQuery(
    "characters",
    () =>
      fetchCharacters({
        limit: 10,
        offset: currentPage * 10,
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
    Number(pageNumber),
    Number(data?.limit),
    Number(data?.total)
  );

  return (
    <div className="flex flex-col gap-8 items-center">
      <div data-cy="cards" className="flex flex-wrap gap-6 justify-center">
        {isFetching ? <SkeletonCardList /> : <CardList data={data?.results} />}
      </div>
      <PaginationTemplate
        isCurrentPage={isCurrentPage}
        pages={pages}
        searchByName={searchByName}
      />
    </div>
  );
};

export default CardListTemplate;
