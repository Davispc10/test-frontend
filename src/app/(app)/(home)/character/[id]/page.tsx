'use client';
import { ComicList } from '@/components/molecules/comic-list';
import { characterService } from '@/services/charactersService';
import { useQuery } from '@tanstack/react-query';
import { BookOpenText } from 'lucide-react';
import Image from 'next/image';
import CharacterSkeleton from './character-skeleton';
import Link from 'next/link';

type CharacterPageProps = {
  params: {
    id: string;
  };
};

const imageLoader = () => {
  return `https://placehold.co/200x200?text=Image not found`;
};

export default function Page({ params }: CharacterPageProps) {
  const characterId = Number(params.id);

  const { data: character, isLoading: isLoadingCharacter } = useQuery({
    queryKey: ['character'],
    queryFn: () => characterService.getCharacterById(characterId),
  });

  if (isLoadingCharacter) return <CharacterSkeleton />;

  const imageCharacter = `${character?.thumbnail?.path}.${character?.thumbnail?.extension}`;
  return (
    <section className="">
      <Link href={'/'} className="mb-20 inline-block rounded-md bg-red-500 p-2 hover:bg-red-700">
        Back to home
      </Link>

      <div className="relative mb-20 flex h-80 items-center justify-center gap-32 rounded-md bg-gradient-to-r from-neutral-800/50 to-neutral-900/10 p-10">
        <Image
          loader={imageLoader}
          loading="lazy"
          src={imageCharacter}
          alt="Image of the character"
          width={200}
          height={200}
          className="aspect-square rounded-full object-cover"
        />

        <div className="flex flex-col gap-10">
          <div>
            <p className="text-2xl font-bold">{character?.name}</p>
            <p className="italic">
              {character?.description || 'no description found for this character'}
            </p>
          </div>

          <div className="flex w-40 flex-col items-center gap-2 rounded-md border-2 p-2">
            <span className="text text-4xl text-red-500">{character?.comics?.available}</span>
            <BookOpenText />
            <p>comics</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <BookOpenText size={32} />
          <h2 className="text-3xl font-bold">Comics</h2>
        </div>
        <ComicList characterId={characterId} />
      </div>
    </section>
  );
}
