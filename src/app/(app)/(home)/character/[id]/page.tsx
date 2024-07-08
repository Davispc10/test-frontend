'use client';
import { ComicList } from '@/components/molecules/comic-list';
import { characterService } from '@/services/charactersService';
import { useQuery } from '@tanstack/react-query';
import { BookOpenText } from 'lucide-react';
import Image from 'next/image';
import CharacterSkeleton from './character-skeleton';
import Link from 'next/link';

import logo from '@/assets/marvel_not_found.png';
import { CharacterInfo } from '@/components/molecules/character-info';
import { CharacterComics } from '@/components/atoms/character-comics';

type CharacterPageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: CharacterPageProps) {
  const characterId = Number(params.id);

  const { data: character, isLoading: isLoadingCharacter } = useQuery({
    queryKey: ['character'],
    queryFn: () => characterService.getCharacterById(characterId),
  });

  if (isLoadingCharacter) return <CharacterSkeleton />;

  const image = character?.thumbnail.path.includes('image_not_available')
    ? logo
    : `${character?.thumbnail.path}.${character?.thumbnail.extension}`;

  return (
    <section>
      <Link href={'/'} className="mb-20 inline-block rounded-md bg-red-500 p-2 hover:bg-red-700">
        Back to home
      </Link>

      <div className="relative mb-20 flex flex-col items-center gap-4 rounded-md bg-gradient-to-r from-neutral-800/50 to-neutral-900/10 p-4 md:h-80 md:flex-row md:gap-32 md:p-10">
        <Image
          loading="lazy"
          src={image}
          alt="Image of the character"
          width={200}
          height={200}
          className="aspect-square rounded-full object-contain"
        />

        <div className="flex flex-col gap-10">
          <CharacterInfo name={character?.name} description={character?.description} />

          {character?.comics && character?.comics?.available > 0 && (
            <CharacterComics available={character?.comics.available} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <BookOpenText className="size-6 md:size-12" />
          <h2 className="text-lg font-bold md:text-3xl">Comics</h2>
        </div>

        <ComicList characterId={characterId} />
      </div>
    </section>
  );
}
