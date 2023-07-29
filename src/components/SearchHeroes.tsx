"use client";

import React, { useContext } from "react";
import { Search } from "lucide-react";
import { Context } from "@/context/contextApi";

type SeachProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchHeroes({ onChange }: SeachProps) {
  const { search } = useContext(Context);

  return (
    <form className="flex flex-row justify-center items-center rounded-md max-w-md w-full shadow-md">
      <input
        type="text"
        placeholder="Pesquisar herói"
        className="w-full p-3 text-xl font-bold text-center text-gray-600 bg-white rounded-l-md focus:outline-none"
        onChange={onChange}
        value={search ? search : ""}
      />
      <button
        type="button"
        className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-red-600 rounded-r-md hover:bg-red-700 focus:outline-none"
      >
        <Search size={28} />
      </button>
    </form>
  );
}
