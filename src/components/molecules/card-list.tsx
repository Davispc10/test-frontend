'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { characterService } from '@/services/charactersService';

import { Pagination } from '../organism/pagination';
import { Card } from './card';
import { CardListSkeleton } from './card-list-skeleton';

export function CardList() {
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const name = searchParams.get('name') ?? null;

  const { data: characters, isLoading: isLoadingCharacters } = useQuery({
    queryKey: ['characters', currentPage, name],
    queryFn: () =>
      characterService.getAllCharacters({ limit: 10, offset: (currentPage - 1) * 10, name }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoadingCharacters) return <CardListSkeleton />;

  return (
    <div>
      <ul className="relative grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {characters?.results?.map((character) => (
          <Card
            key={character.id}
            id={character.id}
            name={character.name}
            description={character.description}
            thumbnail={{ path: character.thumbnail.path, extension: character.thumbnail.extension }}
          />
        ))}
      </ul>

      <Pagination
        onPageChange={handlePageChange}
        totalPages={characters?.total || 0}
        currentPage={currentPage}
      />
    </div>
  );
}
