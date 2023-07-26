import HeroesListActionTypes from "./action-types";

export const getHeroesList = (payload: unknown) => ({
  type: HeroesListActionTypes.GET,
  payload,
});
