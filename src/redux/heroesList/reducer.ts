import { PayloadAction } from "@reduxjs/toolkit";
import HeroesListActionTypes from "./action-types";

const initialState = {
  currentHeroesList: null,
};

const heroesListReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case HeroesListActionTypes.GET:
      return { ...state, currentHeroesList: [] };

    default:
      return state;
  }
};

export default heroesListReducer;
