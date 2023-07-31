import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { HeroesServices } from "@/services/heroes.service";
import { useLoading } from "@/hooks/useLoading";
import { HeroesListReducer } from "@/types/heroes";
import HeroesList from "../HeroesList";
import {
  setHeroes,
  updateOffSet,
  updateTotalPages,
} from "@/redux/heroesList/slice";

const Body = () => {
  const { setLoading } = useLoading();

  const { heroesList, page, perPage } = useSelector(
    (rootReducer: HeroesListReducer) => rootReducer.heroesListReducer
  );
  const dispatch = useDispatch();

  const { isLoading, error } = useQuery(
    ["heroesList", page],
    async () => {
      const pageOffset = page * perPage;

      const { data } = await HeroesServices.getAll(pageOffset, perPage);

      dispatch(setHeroes(data));
      dispatch(updateTotalPages({ total: data.data.total, perPage }));
      dispatch(updateOffSet(pageOffset));
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <div>
      <HeroesList heroesList={heroesList?.data?.results} />
    </div>
  );
};

export default Body;
