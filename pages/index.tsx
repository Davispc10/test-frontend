import axios from "axios";
import Pagination from "../utils/Pagination/Pagination";
import { useState } from "react";
import { useQuery } from "react-query";

//import { Link } from "react-router-dom";
import Link from "next/link";

import { HeroCard } from "../components/HeroCard";
import { ResponseHeroProps } from "../utils/interfaces";
import { BASE_URL, generateMD5Hash } from "../utils/utils";
import React from "react";
//import { MagnifyingGlass, SpinnerGap } from "@phosphor-icons/react";

const publicKey: string = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
const privateKey: string = process.env.NEXT_PUBLIC_PRIVATE_KEY!;

const stringToHash = `1${privateKey}${publicKey}`;
const md5Hash = generateMD5Hash(stringToHash);

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState(157);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const lastPage = Math.ceil(totalPages / itemsPerPage);
  const offset = (itemsPerPage * currentPage) - 10;

  // const getData = async () => {
  //   const response = await axios.get(
  //     `${BASE_URL}/characters?offset=${offset}&limit=${itemsPerPage}&ts=1&apikey=${publicKey}&hash=${md5Hash}`
  //   );
  //   setTotalPages(response.data.data.total);
  //   return response.data.data.results;
  // };

  // const getDataById = async() => {
  //   const response = await axios.get(
  //     `${BASE_URL}/characters?offset=${offset}&nameStartsWith=${search}&limit=${itemsPerPage}&ts=1&apikey=${publicKey}&hash=${md5Hash}`
  //   );
  //   setTotalPages(response.data.data.total);
  //   return response.data.data.results;
  // }

  const getData = async () => {
    let url = `${BASE_URL}/characters?offset=${offset}&limit=${itemsPerPage}&ts=1&apikey=${publicKey}&hash=${md5Hash}`;
    if (search) {
      url += `&nameStartsWith=${search}`;
    }
    const response = await axios.get(url);
    setTotalPages(response.data.data.total);
    return response.data.data.results;
  };

  const { data, refetch } = useQuery<ResponseHeroProps[], Error>({
    queryKey: ["heroes", currentPage],
    queryFn: getData
  });

  console.log(search)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGetData = () => {
    void refetch();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void refetch();
  };

  //console.log(`currentPage:${currentPage}, lastPage:${lastPage}`);

  return (
    <div className='flex flex-col w-screen h-screen p-2 font-bangers'>
      <main className="flex flex-col justify-center items-center w-full">
        <div className="mb-4">
          <form className="flex items-center" onSubmit={handleSubmit}>
            <input
              name="search-user"
              className="border-y px-1 border-black focus:border-red-500 focus:outline-none rounded-sm"
              type="text"
              placeholder="Procure um herói"
              value={search}
              onChange={handleInput}
            />
            <button className="ml-2 p-1 bg-red-500 rounded-md hover:bg-red-700 duration-300">
              {/* <MagnifyingGlass className="text-xl" /> */}
            </button>
          </form>
        </div>
        <div className="heroCard">
          {data ? (
            data.map((hero: ResponseHeroProps) => (
              <Link
                className="w-full h-full hover:bg-red-600 rounded-lg duration-300"
                href={`/hero/${hero.id}`}
                key={hero.id}
              >
                <HeroCard
                  name={hero.name}
                  image={hero.thumbnail.path}
                  id={hero.id}
                  className="w-full h-full flex flex-col justify-start items-center p-1 my-1"
                />
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center w-[400px] h-[500px] mb-6">
              {/* <SpinnerGap className="h-12 w-12 animate-spin text-red-500" /> */}
            </div>
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

export default Home