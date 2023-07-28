import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  search: string;
}

const initialState: SearchState = {
  search: "",
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = "";
    },
  },
});

export const { setSearch, clearSearch } = heroSlice.actions;

export default heroSlice.reducer;