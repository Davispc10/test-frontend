'use client';

import { useSearchParams } from 'next/navigation';
import { LiaSearchSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../ui/Button';

interface CharacterListHeaderProps {
  offset?: number;
}

export default function CharacterListHeader({
  offset,
}: CharacterListHeaderProps) {
  const search = useSelector((state: any) => state.character.search);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const searchoffset = searchParams.get('searchoffset');

  function setSearch(value: string) {
    dispatch({
      type: 'character/setSearchValue',
      payload: value,
    });
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <input
          data-testid="input-search"
          type="text"
          placeholder="Search a character"
          className="w-full max-w-[300px] border-none p-[0.47rem] text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          testid="search-btn"
          disabled={!search}
          href={`/search/${search}?searchoffset=${
            offset ?? searchoffset
          }&character=${search}`}
        >
          <LiaSearchSolid />
        </Button>
      </div>
      {!offset && (
        <div className="mt-2">
          <Button
            testid="clear-filter-btn"
            href={searchoffset ? `/page/${searchoffset}` : '/page/0'}
            onClick={() => setSearch('')}
          >
            Clear filter
          </Button>
        </div>
      )}
    </div>
  );
}
