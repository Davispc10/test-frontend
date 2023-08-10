import { SearchContext } from "../contexts/search.context";
import React, { ChangeEvent, useContext } from "react";

function Navbar() {
  const { search, setSearch } = useContext(SearchContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
  };

  return (
    <div className="bg-zinc-600 py-8 fixed w-full z-50">
      <div
        className="w-4/5 flex justify-center text-center lg:text-start lg:justify-between items-center flex-col lg:flex-row"
        style={{ margin: "0 10%" }}
      >
        <h1 className="w-auto font-title text-5xl lg:text-7xl flex justify-center text-white pb-4 lg:pb-0 lg:pr-4">
          Marvel Characters
        </h1>
        <input
          className="border border-solid rounded-md h-10 lg:w-1/3 px-4 focus:outline-none"
          placeholder="Pesquisa"
          type="text"
          value={search}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
}

export default Navbar;
