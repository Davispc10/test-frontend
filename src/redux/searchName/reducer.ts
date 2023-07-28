import { PayloadAction } from "@reduxjs/toolkit";
import SearchNameActionTypes from "./action-types";

const initialState = {
  searchName: null,
};

const searchNameReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SearchNameActionTypes.WRITE:
      return { ...state, searchName: action.payload };

    default:
      return state;
  }
};

export default searchNameReducer;
