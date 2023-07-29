import { PayloadAction } from "@reduxjs/toolkit";
import HeroesListActionTypes from "./action-types";

const initialState = {
  heroesList: null,
};

const heroesListReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case HeroesListActionTypes.GET:
      return { ...state, heroesList: action.payload };

    default:
      return state;
  }
};

export default heroesListReducer;
