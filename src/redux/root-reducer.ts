import { combineReducers } from "@reduxjs/toolkit";

import searchNameReducer from "./searchName/reducer";
import heroesListReducer from "./heroesList/slice";

const rootReducer = combineReducers({ heroesListReducer, searchNameReducer });

export default rootReducer;
