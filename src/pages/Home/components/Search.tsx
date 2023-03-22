import FadeRightAnimation from '@/components/animations/FadeRight';
import HoverScaleAnimation from '@/components/animations/HoverScale';

import { MagnifyingGlass as SearchIcon } from 'phosphor-react';

import { useRef, useContext } from 'react';
import { useAtom } from 'jotai';
import { searchAtom } from '@/atoms/search.atom';
import { PaginationContext } from '@/providers/pagination';

const Search = () => {
  const [_, setSearch] = useAtom(searchAtom);
  const { setCurrentPage } = useContext(PaginationContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1); // Resetar paginação
    setSearch(inputRef.current?.value);
  };
  return (
    <form>
      <FadeRightAnimation
        options={{
          delay: 0.2,
        }}
        className="
          flex gap-2 items-center bg-white p-2 rounded-md
          focus-within:ring-[2px] focus-within:ring-marvel-red
        "
      >
        <input
          className="bg-transparent w-64 focus:outline-none text-marvel-red px-2"
          type="text"
          placeholder="Search by Name"
          ref={inputRef}
        />
        <HoverScaleAnimation>
          <button
            type="submit" // Para funcionar com o botão enter
            className="
            bg-marvel-red text-white rounded-md p-2
            active:scale-95
            "
            onClick={(event) => {
              event.preventDefault();
              setSearch(inputRef.current?.value);
            }}
          >
            <SearchIcon weight="bold" />
          </button>
        </HoverScaleAnimation>
      </FadeRightAnimation>
    </form>
  );
};

export default Search;
