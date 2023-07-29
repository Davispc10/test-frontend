import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { HeroesServices } from "@/services/heroes.service";
import { getHeroesList } from "@/redux/heroesList/actions";
import { useLoading } from "@/hooks/useLoading";
import { GetHeroesResponse, Hero } from "@/types/heroes";
import HeroesList from "../HeroesList";

const HEROES_PER_PAGE = 8;

const Body = () => {
  const { setLoading } = useLoading();

  const heroesList = useSelector(
    (state: { heroesListReducer: GetHeroesResponse }) => state.heroesListReducer
  );
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);

  const handleSetHeroDefaultData = useCallback((heroesList: Hero[]) => {
    const filteredData = heroesList.map((hero) => {
      if (hero.description.length < 1) {
        hero.description = "Descrição não informada";
      }

      if (hero.thumbnail.path.length < 0) {
        hero.thumbnail.path = "";
      }

      return hero;
    });

    return filteredData;
  }, []);

  const { isLoading, error } = useQuery(["heroesList", page], async () => {
    const pageOffset = page * HEROES_PER_PAGE;

    const { data } = await HeroesServices.getAll(pageOffset, HEROES_PER_PAGE);

    const filledHeroes = handleSetHeroDefaultData(data.data.results);

    const heroesList: GetHeroesResponse = Object.assign(data);
    heroesList.data.results = filledHeroes;

    dispatch(getHeroesList(heroesList));
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
