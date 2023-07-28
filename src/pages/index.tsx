import React, { useState, ChangeEvent } from "react";
import { useQuery } from "react-query";
import { getAllHeroes } from "../services/apiServices";
import { RootState } from "../app/store";
import { setSearch } from "../features/HeroSlice";
import { useDispatch, useSelector } from "react-redux";

import HomePage from '../components/templates/HomeTemplate'

const Home = () => {
  const search = useSelector((state: RootState) => state.hero.search);
  const dispatch = useDispatch();

  const [totalPages, setTotalPages] = useState<number>(157);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage: number = 10;
  const lastPage: number = Math.ceil(totalPages / itemsPerPage);
  const offset: number = itemsPerPage * currentPage - 10;  

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["heroes", currentPage, search],
    queryFn: () => getAllHeroes(offset, itemsPerPage, search),
    onSuccess: (result) => {
      setTotalPages(result.total);
    },
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleGetData = () => {
    void refetch();
  };
  
  return (
    <div className="flex flex-col w-screen h-screen p-2 font-bangers">
      <HomePage 
        {...{
          search,
          setCurrentPage,
          isLoading,
          lastPage,
          data,
          currentPage,
          handleInput,
          handleGetData,
        }}
      />
    </div>
  );
};

export default Home;