import { GetHeroesResponse, Hero } from "@/types/heroes";
import { createSlice } from "@reduxjs/toolkit";

interface ReducerData {
  heroesList: GetHeroesResponse;
  page: number;
  totalPages: number;
  itemsOffset: number;
  perPage: number;
}

const initialState: ReducerData = {
  heroesList: [] as unknown as GetHeroesResponse,
  page: 0,
  totalPages: 0,
  itemsOffset: 0,
  perPage: 8,
};

const handleSetHeroDefaultData = (heroesList: Hero[]) => {
  const filteredData = heroesList.map((hero) => {
    if (hero.description.length < 1) {
      hero.description = "Descrição não informada";
    }

    if (hero.thumbnail.path.length < 0) {
      hero.thumbnail.path =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg";
    }

    return hero;
  });

  return filteredData;
};

const heroesSlice = createSlice({
  name: "heroesList",
  initialState,
  reducers: {
    getHeroes: (state, action) => {
      const filledHeroesData = handleSetHeroDefaultData(
        action.payload.data.results
      );

      const heroesList: GetHeroesResponse = Object.assign(action.payload);
      heroesList.data.results = filledHeroesData;

      state.heroesList = heroesList;
    },

    changePage: (state, action) => {
      state.page = action.payload;
    },

    updateTotalPages: (state, action) => {
      const newTotalPages = action.payload.total / action.payload.perPage;

      state.totalPages = newTotalPages;
    },

    updateOffSet: (state, action) => {
      state.itemsOffset = action.payload as number;
    },
  },
});

export default heroesSlice.reducer;
export const { getHeroes, changePage, updateOffSet, updateTotalPages } =
  heroesSlice.actions;
