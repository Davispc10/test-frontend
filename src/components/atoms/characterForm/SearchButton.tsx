import { Search } from "lucide-react";
import React from "react";

const SearchButton = () => {
  return (
    <button className="absolute top-0 right-0 p-3 hover:bg-opacity-90 text-white  bg-slate-600 rounded-full">
      <Search />
    </button>
  );
};

export default SearchButton;
