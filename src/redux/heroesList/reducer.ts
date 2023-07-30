import { useCallback } from "react";
import { PayloadAction } from "@reduxjs/toolkit";
import HeroesListActionTypes from "./action-types";
import { GetHeroesResponse, Hero } from "@/types/heroes";

const initialState = {
  heroesList: null,
  page: 0,
  totalPages: 0,
  itemsOffset: 0,
  perPage: 8,
};

const handleSetHeroDefaultData = (heroesList: Hero[]) => {
  const filteredData = heroesList.map((hero) => {
    if (hero.description.length < 1) {
      hero.description = "Descrição não informada";
    }

    if (hero.thumbnail.path.length < 0) {
      hero.thumbnail.path =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg";
    }

    return hero;
  });

  return filteredData;
};

const heroesListReducer = (
  state = initialState,
  action: PayloadAction<any>
) => {
  switch (action.type) {
    case HeroesListActionTypes.GET:
      const filledHeroesData = handleSetHeroDefaultData(
        action.payload.data.results
      );

      const heroesList: GetHeroesResponse = Object.assign(action.payload);
      heroesList.data.results = filledHeroesData;

      return { ...state, heroesList: heroesList };

    case HeroesListActionTypes.CHANGE_PAGE:
      return { ...state, page: action.payload };

    case HeroesListActionTypes.UPDATE_OFFSET:
      return { ...state, itemsOffset: action.payload };

    case HeroesListActionTypes.UPDATE_TOTAL_PAGES:
      const newTotalPages = action.payload.total / action.payload.perPage;

      return { ...state, totalPages: newTotalPages };

    default:
      return state;
  }
};

export default heroesListReducer;
