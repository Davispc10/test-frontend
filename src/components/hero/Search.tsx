import FadeRightAnimation from "@/components/animations/FadeRight";
import HoverScaleAnimation from "@/components/animations/HoverScale";

import { MagnifyingGlass as SearchIcon } from "phosphor-react";

import { useRef, useContext } from "react";
import { useAtom } from "jotai";
import { searchAtom } from "@/atoms/search.atom";
import { PaginationContext } from "@/providers/pagination";

const Search = () => {
  const [_, setSearch] = useAtom(searchAtom);
  const { goToPage } = useContext(PaginationContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const value = inputRef.current?.value || "";
    goToPage(1); // Resetar paginação
    setSearch(value);
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
          className="w-64 px-2 bg-transparent focus:outline-none text-marvel-red"
          type="text"
          placeholder="Search by Name"
          ref={inputRef}
        />
        <HoverScaleAnimation>
          <button
            type="submit" // Para funcionar com o botão enter
            className="p-2 text-white rounded-md bg-marvel-red active:scale-95"
            onClick={handleSearch}
          >
            <SearchIcon weight="bold" />
          </button>
        </HoverScaleAnimation>
      </FadeRightAnimation>
    </form>
  );
};

export default Search;
