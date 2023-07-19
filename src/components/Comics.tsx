import React from 'react';
import { useQuery } from "react-query";
import { getHeroComics } from "../services/apiServices";
import { useRouter } from "next/router";
import { Comic } from "../utils/interfaces";
import { CircleNotch } from "@phosphor-icons/react";
import { defaultComicsMessage } from '../utils/utils';

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
    <div className="flex flex-col justify-center items-center">
      <p className="mb-1 text-black text-md">
        Comics
      </p>
      {isLoading && (
        <CircleNotch className="h-12 w-12 animate-spin text-red-500" />
      )}
      <div className="flex flex-row">
        {data?.length && (
          data.slice(0,5).map((comic: Comic) => {
            return (
              <img 
                className="h-20 w-12 xs:h-28 xs:w-20 mr-2 rounded-sm border-2 border-slate-800"
                key={comic.id} 
                src={`${comic.thumbnail.path}.jpg`} 
              />            
            )
          })
        )}
        {!isLoading && data?.length === 0 && (
          <p>
           {defaultComicsMessage}
          </p>
        )}      
      </div>
    </div>
  );
};