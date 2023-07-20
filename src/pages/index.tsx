import React, { useState, ChangeEvent, FormEvent } from "react";
import { useQuery } from "react-query";
import { getAllHeroes } from "../services/apiServices";

import HeroesList from "../components/Heroes/HeroesList";
import Pagination from "../components/Pagination/Pagination";
import { HeroProps } from "../utils/interfaces";
import { CircleNotch, MagnifyingGlass } from "@phosphor-icons/react";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(157);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage: number = 10;
  const lastPage: number = Math.ceil(totalPages / itemsPerPage);
  const offset: number = itemsPerPage * currentPage - 10;

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["heroes", currentPage],
    queryFn: () => getAllHeroes(offset, itemsPerPage, search),
    onSuccess: (result) => {
      setTotalPages(result.total);
    },
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGetData = () => {
    void refetch();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void refetch();
  };

  return (
    <div className="flex flex-col w-screen h-screen p-2 font-bangers">
      <main className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-center w-full h-16 mb-6 mt-2">
          <form className="flex justify-center w-2/4 h-full items-center" onSubmit={handleSubmit}>
            <input
              name="search-user"
              className="border-y-2 px-1 h-3/5 w-3/4 md:w-2/4 bg-red-500 border-black focus:border-red-500 focus:outline-none rounded-md"
              type="text"
              placeholder="find your hero"
              value={search}
              onChange={handleInput}
            />
            <button className="ml-4 p-1 bg-red-500 rounded-md hover:bg-red-700 duration-300">
              <MagnifyingGlass className="text-xl" />
            </button>
          </form>
        </div>
        <div className={`${data ? "heroCard" : "loadingCard"}`}>
          {isLoading && (
            <CircleNotch className="text-8xl animate-spin text-red-500" />
          )}
          {data && (
            data.results.map((hero: HeroProps) => (
              <HeroesList {...hero} key={hero.id} />
            ))
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          maxLength={5}
          setCurrentPage={setCurrentPage}
          onClick={handleGetData}
        />
      </main>
    </div>
  );
};

export default Home;