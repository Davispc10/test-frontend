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

const defaultThumbnailUrl = "/_next/static/media/placeholder.43193f81";
const defaultThumbnailExtension = "jpg";

const handleSetHeroDefaultData = (heroesList: Hero[]) => {
  const filteredData = heroesList.map((hero) => {
    if (hero.description.length < 1) {
      hero.description = "Descrição não informada";
    }

    if (
      hero.thumbnail.path.length < 0 ||
      hero.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    ) {
      hero.thumbnail = {
        path: defaultThumbnailUrl,
        extension: defaultThumbnailExtension,
      };
    }

    return hero;
  });

  return filteredData;
};

const heroesSlice = createSlice({
  name: "heroesList",
  initialState,
  reducers: {
    setHeroes: (state, action) => {
      const filledHeroesData = handleSetHeroDefaultData(
        action.payload.data.results
      );

      const heroesList: GetHeroesResponse = {
        ...action.payload,
        heroesList: filledHeroesData,
      };

      state.heroesList = heroesList;
    },

    changePage: (state, action) => {
      state.page = action.payload;
    },

    updateTotalPages: (state, action) => {
      const newTotalPages = Math.ceil(
        action.payload.total / action.payload.perPage
      );

      state.totalPages = newTotalPages;
    },

    updateOffSet: (state, action) => {
      state.itemsOffset = action.payload as number;
    },
  },
});

export default heroesSlice.reducer;
export const { setHeroes, changePage, updateOffSet, updateTotalPages } =
  heroesSlice.actions;
