import React from 'react';
import { useQuery } from "react-query";
import { getHeroComics } from "../../services/apiServices";
import { useRouter } from "next/router";
import { Comic } from "../../utils/interfaces";
import { CircleNotch } from "@phosphor-icons/react";
import { defaultComicsMessage } from '../../utils/utils';
import { ComicsTitle } from '../atoms/ComicsTitle';
import { ComicsDefaultMessage } from '../atoms/ComicsDefaultMessage';
import { ComicList } from '../molecules/ComicList';

export const Comics = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  const { data, isLoading } = useQuery<Comic[]>({
    queryKey: ['comics', id],
    queryFn: () => getHeroComics(id),
    refetchOnMount: 'always',
    staleTime: 0,
  });

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <ComicsTitle />
      {isLoading && (
        <CircleNotch className="h-12 w-12 animate-spin text-red-500" />
      )}
      <div className="flex flex-row w-full justify-center">
        {data?.length! > 0 && (
          data!.slice(0,5).map((comic: Comic) => {
            return (
              <ComicList thumbnail={comic.thumbnail.path} id={comic.id} key={comic.id} />
            )
          })
        )}
        {!isLoading && data?.length === 0 && (
          <ComicsDefaultMessage defaultMessage={defaultComicsMessage} />
        )}      
      </div>
    </div>
  );
};