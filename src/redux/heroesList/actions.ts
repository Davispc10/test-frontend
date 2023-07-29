import { GetHeroesResponse } from "@/types/heroes";
import HeroesListActionTypes from "./action-types";

export const getHeroesList = (payload: GetHeroesResponse) => ({
  type: HeroesListActionTypes.GET,
  payload,
});
