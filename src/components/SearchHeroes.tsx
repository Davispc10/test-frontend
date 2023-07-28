import React from "react";
import { Search } from "lucide-react";

type SeachProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchHeroes({ onChange }: SeachProps) {

  return (
    <form className="flex flex-row justify-center items-center border rounded-md w-96">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-3 text-xl font-bold text-center text-gray-600 bg-white rounded-l-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        onChange={onChange}
      />
      <button
        type="button"
        className="flex items-center justify-center p-3 text-xl font-bold text-center text-white bg-red-600 rounded-r-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
      >
        <Search size={28} className="mr-2" />
      </button>
    </form>
  );
}
