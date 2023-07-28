"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export const OrganismForm: React.FC = (): JSX.Element => {
  const navigate = useRouter();
  const [search, setSearch] = useState<string>("" as string);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate.push(`?s=${search}`);
      }}
      className="flex items-center rounded-full"
    >
      <input
        onChange={({ target }) => setSearch(target.value)}
        value={search}
        type="text"
        placeholder="Fetch hero..."
        name="search"
        className="w-full h-10 max-w-xs pl-5 rounded-tl-full rounded-bl-full outline-none bg-slate-200"
      />
      <button
        className="block h-10 px-4 pr-5 duration-200 bg-blue-700 rounded-r-full hover:bg-blue-600"
        type="submit"
      >
        <FiSearch size={24} className="text-white border-0 outline-none" />
      </button>
    </form>
  );
};
