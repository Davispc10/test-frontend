import { createSlice } from "@reduxjs/toolkit";

interface ReducerData {
  searchName: string;
}

const initialState: ReducerData = {
  searchName: "",
};

const searchNameSlice = createSlice({
  name: "searchName",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.searchName = action.payload;
    },
  },
});

export default searchNameSlice.reducer;
export const { changeName } = searchNameSlice.actions;
