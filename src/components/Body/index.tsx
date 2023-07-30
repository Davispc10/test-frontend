import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { HeroesServices } from "@/services/heroes.service";
import {
  getHeroesList,
  updateItemsOffset,
  updateTotalPages,
} from "@/redux/heroesList/actions";
import { useLoading } from "@/hooks/useLoading";
import { HeroesListReducer } from "@/types/heroes";
import HeroesList from "../HeroesList";

const Body = () => {
  const { setLoading } = useLoading();

  const { heroesList, page, perPage } = useSelector(
    (rootReducer: HeroesListReducer) => rootReducer.heroesListReducer
  );
  const dispatch = useDispatch();

  const { isLoading, error } = useQuery(["heroesList", page], async () => {
    const pageOffset = page * perPage;

    const { data } = await HeroesServices.getAll(pageOffset, perPage);

    dispatch(getHeroesList(data));
    dispatch(updateTotalPages({ total: data.data.total, perPage }));
    dispatch(updateItemsOffset(pageOffset));
  });

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
