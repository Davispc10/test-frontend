import { SearchContext } from "@/contexts/search.context";
import React, { useContext } from "react";

function Navbar() {
  const { search, setSearch } = useContext(SearchContext);

  const handleChange = (e: any) => {
    const query = e.target.value;
    setSearch(query);
  };

  return (
    <div className="bg-zinc-600 py-8 fixed w-full z-50">
      <div
        className="w-4/5 flex justify-between items-center flex-row"
        style={{ margin: "0 10%" }}
      >
        <h1 className="w-auto font-title text-7xl flex justify-center text-white">
          Marvel Characters
        </h1>
        <input
          className="border border-solid rounded-md h-10 w-1/3 px-4"
          placeholder="Busque o Personagem da Marvel"
          type="text"
          value={search}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
}

export default Navbar;
