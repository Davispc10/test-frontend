import { HeroProps, QueryProps } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: QueryProps = {
  page: 0,
  pageTotal: 0,
  limit: 10,
  searchName: '',
  heros: []
};

export const QuerySlice = createSlice({
  name: "queryItems",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page
    },
    changeLimit: (state, action: PayloadAction<{ limit: number }>) => {
      state.limit = action.payload.limit
    },
    changePageTotal: (state, action: PayloadAction<{ pageTotal: number }>) => {
      state.pageTotal = action.payload.pageTotal
    },
    changeSearchName: (state, action: PayloadAction<{ searchName: string }>) => {
      state.searchName = action.payload.searchName
    },
    addHeros: (state, action: PayloadAction<{ hero: HeroProps[] }>) => {
      state.heros = action.payload.hero
    },
    resetHeros: (state) => {
      state.heros = []
    },
  }
});

export default QuerySlice.reducer;
export const { changeLimit, changePage, changePageTotal, changeSearchName, addHeros, resetHeros } = QuerySlice.actions;