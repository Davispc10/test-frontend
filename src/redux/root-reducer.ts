import { combineReducers } from "@reduxjs/toolkit";

import heroesListReducer from "./heroesList/reducer";

const rootReducer = combineReducers({ heroesListReducer });

export default rootReducer;
