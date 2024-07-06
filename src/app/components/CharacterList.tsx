'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Character } from '../types/character';
import { fetchCharacters } from '../api/fetch-characters';
import Link from 'next/link';
import CharacterListSkeleton from './skeletons/CharacterListSkeleton';


const CharacterList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const initialName = searchParams.get('name') || '';

  const [page, setPage] = useState(initialPage);
  const [name, setName] = useState(initialName);

  const debouncedName = useDebounce(name, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['characters', page, debouncedName],
    queryFn: () => fetchCharacters(page, debouncedName),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });


  useEffect(() => {
    if (data && data.total && (page - 1) * 20 >= data.total) {
      setPage(1);
    } else {

      const params = new URLSearchParams();
      params.set('page', page.toString());

      if (debouncedName) params.set('name', debouncedName);

      router.push(`${pathname}?${params.toString()}`);
    }
  }, [page, debouncedName, data, router, pathname]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  if (isLoading) return <CharacterListSkeleton />;
  if (isError) return <div>Erro ao carregar os dados</div>;

  return (
    <main className="w-full h-[100vh]">
      <section className="mx-auto my-4 w-full max-w-7xl mt-24">
        <div className='flex flex-row gap-8 justify-center align-middle max-lg:flex-col max-lg:p-6'>
          <Input
            type="text"
            value={name}
            onChange={handleInputChange}
            placeholder="Procurar pelo nome"
          />
          <div className='flex flex-row gap-4 max-lg:justify-between items-center'>
            <Button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>Anterior</Button>
            <span>{page}</span>
            <Button onClick={() => setPage((old) => old + 1)} disabled={data?.characters.length < 20}>Próxima</Button>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-2 mt-4 max-lg:p-6">
          {data?.characters.map((character: Character) => (
            <div key={character.id} className="rounded-lg shadow-md overflow-hidden">
              <Link href={{
                pathname: `/character/${character.id}`,
                query: { page, name },
              }}>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <span className="block text-xl font-semibold mb-2">{character.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CharacterList;
