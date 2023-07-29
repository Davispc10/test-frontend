import { Search } from "lucide-react";

export function HeroesSearch() {
  return (
    <>
      <form className="  mb-9 flex justify-center items-center rounded-md  w-full shadow-md">
        <input
          type="text"
          placeholder="search your Hero..."
          className="w-full p-3 text-xl font-semibold text-left text-gray-600 bg-white rounded-l-md focus:outline-none"
          // onChange={onChange}
          // value={search ? search : ""}
        />
        <button
          type="button"
          className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-zinc-600 rounded-r-md hover:bg-zinc-500 focus:outline-none"
        >
          <Search size={28} />
        </button>
      </form>
    </>
  );
}
