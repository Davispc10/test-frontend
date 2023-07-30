import { combineReducers } from "@reduxjs/toolkit";

import searchNameReducer from "./searchName/slice";
import heroesListReducer from "./heroesList/slice";

const rootReducer = combineReducers({ heroesListReducer, searchNameReducer });

export default rootReducer;
