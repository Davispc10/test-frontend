"use client";

import { fetchCharacters, searchName, setSearch } from "@/redux/slices/charactersSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function SearchForm() {
  const search = useAppSelector((state) => state.charactersMarvel.search)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(searchName(search));
    }, 500);

    if(search.trim()===""){
      dispatch(fetchCharacters())
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  useEffect(() => {
    if (search.trim() === "") {
      dispatch(fetchCharacters());;
    } 
  }, []);

  return (
    <span className="relative flex items-center">
      <span className="absolute right-4">
        <Search size={24} />
      </span>
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="bg-zinc-600 rounded-full w-auto p-4 pr-12"
        placeholder="Search character"
      />
    </span>
  );
}
