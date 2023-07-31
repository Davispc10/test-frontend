import Image from "next/image";
import React, { useEffect } from "react";

import Logo from "/public/images/marvel_logo.png";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeName } from "@/redux/searchName/slice";
import { useQuery } from "react-query";
import { useLoading } from "@/hooks/useLoading";
import { HeroesServices } from "@/services/heroes.service";
import { SearchNameListReducer } from "@/types/search_name";
import {
  setHeroes,
  changePage,
  updateOffSet,
  updateTotalPages,
} from "@/redux/heroesList/slice";
import { HeroesListReducer } from "@/types/heroes";

const Header = () => {
  const { searchName } = useSelector(
    (rootReducer: SearchNameListReducer) => rootReducer.searchNameReducer
  );
  const { perPage } = useSelector(
    (rootReducer: HeroesListReducer) => rootReducer.heroesListReducer
  );
  const dispatch = useDispatch();

  const { setLoading } = useLoading();
  const { data, isLoading, isError, refetch } = useQuery(
    ["characters", searchName],
    async () => {
      const { data } = await HeroesServices.getAll(0, 8, searchName);
      return data;
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleText = (e: any) => dispatch(changeName(e.target.value));

  const handleSearchByName = async () => refetch();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (data?.data?.results && data?.data?.results?.length > 0) {
      dispatch(changePage(0));
      dispatch(setHeroes(data));
      dispatch(updateOffSet(0));
      dispatch(updateTotalPages({ total: data.data.total, perPage: perPage }));
    }
  }, [data]);

  return (
    <header className="flex justify-center lg:justify-between items-center p-8">
      <div className="lg:block hidden">
        <Image src={Logo} width={250} alt="Logo Marvel" priority />
      </div>

      <div className="px-2 py-2 flex items-center justify-center w-fit border-red-500 border-[1px] rounded-md">
        <input
          type="text"
          defaultValue={searchName}
          onChange={handleText}
          placeholder="Pesquisar heroi"
          className="bg-transparent px-4"
        />
        <GoSearch
          onClick={handleSearchByName}
          className="cursor-pointer px-2"
          color={"#000"}
          size={35}
        />
      </div>

      <div className=" w-[250px] lg:block hidden" />
    </header>
  );
};

export default Header;
