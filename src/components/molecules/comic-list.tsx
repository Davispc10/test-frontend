'use client';

import { comicsService } from '@/services/comicsService';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

type ComicListProps = {
  characterId: number;
};

export function ComicList({ characterId }: ComicListProps) {
  const { data: comics, isLoading: isLoadingComics } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => comicsService.getComicById(characterId),
  });

  if (isLoadingComics) return null;

  return (
    <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      {comics.results?.map((comic: any) => (
        <li key={comic.id} className="flex flex-col justify-between md:h-auto">
          <div className="flex flex-col justify-center gap-2">
            <div className="flex h-14 w-full items-center justify-center rounded-md bg-red-500 p-4">
              <p>{comic.title}</p>
            </div>
            <div className="relative h-96">
              <Image
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt="Comic image"
                fill
                objectFit="cover"
              />
            </div>
          </div>
        </li>
      ))}

      {comics.results?.length === 0 && <p>No comics found</p>}
    </ul>
  );
}
