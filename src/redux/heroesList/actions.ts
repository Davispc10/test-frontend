import { GetHeroesResponse } from "@/types/heroes";
import HeroesListActionTypes from "./action-types";

export const getHeroesList = (payload: GetHeroesResponse) => ({
  type: HeroesListActionTypes.GET,
  payload,
});

export const changeHeroesPage = (payload: number) => ({
  type: HeroesListActionTypes.CHANGE_PAGE,
  payload,
});

export const updateItemsOffset = (payload: number) => ({
  type: HeroesListActionTypes.UPDATE_OFFSET,
  payload,
});

export const updateTotalPages = (payload: {
  total: number;
  perPage: number;
}) => ({
  type: HeroesListActionTypes.UPDATE_TOTAL_PAGES,
  payload,
});
