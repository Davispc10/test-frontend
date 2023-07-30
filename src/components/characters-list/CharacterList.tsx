'use client';

import { retrieveCharactersList } from '@/services';
import { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../ui/Button';
import CharacterListCards from './CharacterListCards';
import CharacterListFooter from './CharacterListFooter';
import CharacterListHeader from './CharacterListHeader';

export default function CharacterList() {
  const offset = useSelector((state: any) => state.offset.offset);
  const name = useSelector((state: any) => state.character.name);
  const search = useSelector((state: any) => state.character.search);
  const [characterNames, setCharacterNames] = useState<string[]>([]);

  const dispatch = useDispatch();

  async function getCharacters() {
    try {
      const response = await retrieveCharactersList(offset, name);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function getCharactersNames() {
    try {
      const response = await retrieveCharactersList(offset, search);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const { isLoading, error, data, refetch } = useQuery(
    ['characters', offset, name],
    getCharacters,
    {
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
    }
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

  function setSearch(search: string) {
    dispatch({
      type: 'character/setSearchValue',
      payload: search,
    });
  }

  function setName(name: string) {
    dispatch({
      type: 'character/setCharacterName',
      payload: name,
    });
  }

  function setOffset(action: string) {
    if (action === 'next') {
      dispatch({
        type: 'offset/incrementOffset',
        payload: 20,
      });
    } else {
      dispatch({
        type: 'offset/decrementOffset',
        payload: 20,
      });
    }
  }

  function setFilter(value: string) {
    setName(value);
    setSearch(value);
  }

  useEffect(() => {
    if (search === '') {
      dispatch({
        type: 'character/setCharacterName',
        payload: '',
      });
    }
  }, [search, dispatch]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center max-[1160px]:h-[700px] max-[1160px]:justify-center">
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
        <div className="mb-2 mt-5 flex h-[650px] w-full items-center justify-center max-[1160px]:h-[245px]">
          <div className="border-4 border-black bg-white px-3 py-6 text-center text-black">
            <h1 className="font-marvel text-2xl font-extrabold tracking-widest">
              LOADING CHARACTERS...
            </h1>
          </div>
        </div>
        <CharacterListFooter
          prevDisabled={true}
          nextDisabled={true}
          nextPage={() => setOffset('next')}
          previousPage={() => setOffset('previous')}
        />
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center max-[1160px]:h-[700px] max-[1160px]:justify-center">
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
          prevDisabled={true}
          nextDisabled={true}
          nextPage={() => setOffset('next')}
          previousPage={() => setOffset('previous')}
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
    <section className="flex flex-col items-center max-[1160px]:h-[700px] max-[1160px]:justify-center">
      <CharacterListHeader
        value={search}
        onChange={setSearch}
        setValue={setFilter}
        items={characterNames}
        setItems={() => setCharacterNames([])}
        search={search}
        setName={setName}
      />
      <CharacterListCards characters={data} />
      <CharacterListFooter
        nextPage={() => setOffset('next')}
        prevDisabled={offset === 0}
        previousPage={() => {
          offset !== 0 && setOffset('previous');
        }}
      />
    </section>
  );
}
