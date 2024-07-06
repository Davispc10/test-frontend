'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { fetchCharacter } from '../api/fetch-character-by-id';
import { fetchComics } from '../api/fetch-character-comics';
import CharacterDetailSkeleton from './skeletons/CharacterDetailsSkeleton';


const CharacterDetail = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
    enabled: !!id,
  });

  const { data: comicsData, isLoading: isComicsLoading, isError: comicsError } = useQuery({
    queryKey: ['comics', id],
    queryFn: () => fetchComics(id),
    enabled: !!id,
  });

  if (!data || !id || isLoading || isComicsLoading) {
    return <CharacterDetailSkeleton />;
  }

  if (isError || comicsError) {
    return <div>Error fetching data</div>;
  }

  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-7xl mt-24">
        <div className='flex flex-row gap-4 align-middle max-lg:flex-col max-lg:p-6'>
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt={data.name}
            className='w-96 object-cover rounded-xl'
          />

          <div className='flex flex-col gap-y-4 w-full'>
            <div className='flex justify-between'>
              <h1 className='text-lg font-bold md:text-4xl'>{data.name}</h1>
              <Button onClick={() => router.back()}>Voltar</Button>
            </div>

            <p className='text-xs leading-5 text-muted-foreground md:text-sm md:leading-6'>{data.description}</p>
          </div>
        </div>

        <Tabs defaultValue="comics" className="mt-12 max-lg:p-6">
          <TabsList>
            <TabsTrigger value="comics">Quadrinhos</TabsTrigger>
          </TabsList>
          <TabsContent value="comics">
            <div className='flex flex-row gap-2 bg-secondary p-4 rounded-md'>
              <ul className="grid grid-cols-8 gap-4 max-lg:grid-cols-4">
                {comicsData.map((comic: any) => (
                  <li key={comic.id} className="flex-none">
                    <img className='w-36 object-cover rounded-md' src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" />
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default CharacterDetail;
