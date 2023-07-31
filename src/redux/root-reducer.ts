import { combineReducers } from "@reduxjs/toolkit";

import searchNameReducer from "./searchName/slice";
import heroesListReducer from "./heroesList/slice";
import selectedHeroReducer from "./selectedHero/slice";

const rootReducer = combineReducers({
  heroesListReducer,
  searchNameReducer,
  selectedHeroReducer,
});

export default rootReducer;
