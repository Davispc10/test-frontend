'use client';

import { retrieveCharactersList } from '@/services';
import { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { useQuery } from 'react-query';

import Button from '../ui/Button';
import CharacterListCards from './CharacterListCards';
import CharacterListFooter from './CharacterListFooter';
import CharacterListHeader from './CharacterListHeader';

export default function CharacterList() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [characterNames, setCharacterNames] = useState<string[]>([]);

  async function getCharacters() {
    const response = await retrieveCharactersList(offset, name);
    return response;
  }

  async function getCharactersNames() {
    const response = await retrieveCharactersList(offset, search);
    return response;
  }

  const { isLoading, error, data, refetch } = useQuery(
    ['characters', offset, name],
    getCharacters
  );

  useQuery(['characterNames', search], getCharactersNames, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      const names = data.map((character: any) => character.name);
      setCharacterNames(names);
    },
  });

  useEffect(() => {
    if (search === '') {
      setName('');
    }
  }, [search]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex w-full gap-x-2">
          <CharacterListHeader
            value={search}
            onChange={setSearch}
            setValue={setSearch}
            items={characterNames}
            search={search}
            setName={setName}
          />
        </div>
        <div className="mb-2 mt-5 flex h-[650px] w-full items-center justify-center">
          <div className="border-4 border-black bg-white px-3 py-6 text-center text-black">
            <h1 className="font-marvel text-2xl font-extrabold tracking-widest">
              LOADING CHARACTERS...
            </h1>
          </div>
        </div>
        <CharacterListFooter
          nextPage={() => setOffset(offset + 20)}
          previousPage={() => setOffset(offset - 20)}
        />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex w-full gap-x-2">
          <CharacterListHeader
            value={search}
            onChange={setSearch}
            setValue={setSearch}
            items={characterNames}
            search={search}
            setName={setName}
          />
        </div>
        <div className="mb-2 mt-5 flex h-[650px] w-full items-center justify-center">
          <div className="border-4 border-black bg-white px-3 py-6 text-center text-black">
            <h1 className="font-marvel text-2xl font-extrabold tracking-widest">
              NO CHARACTERS FOUND...
            </h1>
          </div>
        </div>
        <CharacterListFooter
          nextPage={() => setOffset(offset + 20)}
          previousPage={() => setOffset(offset - 20)}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-calc w-full items-center justify-center">
        <div className="mb-14 flex flex-col items-center justify-center gap-y-4 border-4 border-black bg-white px-3 py-6 text-center text-black">
          <h1 className="font-marvel text-2xl font-extrabold tracking-widest">
            ERROR LOADING CHARACTERS...
          </h1>
          <Button onClick={refetch}>
            Try again
            <FiRefreshCcw />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-[1160px]:h-auto max-[1160px]:justify-center">
      <CharacterListHeader
        value={search}
        onChange={setSearch}
        setValue={setSearch}
        items={characterNames}
        setItems={() => setCharacterNames([])}
        search={search}
        setName={setName}
      />
      <CharacterListCards characters={data} />
      <CharacterListFooter
        nextPage={() => setOffset(offset + 20)}
        prevDisabled={offset === 0}
        previousPage={() => {
          offset !== 0 && setOffset(offset - 20);
        }}
      />
    </div>
  );
}
