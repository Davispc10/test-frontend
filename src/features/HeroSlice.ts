import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
interface FavHero {
  name: string,
  image: string,
  id: number,
}

interface FavHeroesProps {
  results: Array<FavHero>,
}

interface HeroState {
  search: string,
  favHeroes: FavHeroesProps,
}

const loadFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const favHeroesData = localStorage.getItem("favHeroes");
      return favHeroesData ? JSON.parse(favHeroesData) : { results: [] };
    }
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
  }
  return { results: [] };
};

const initialState: HeroState = {
  search: "",
  favHeroes: loadFromLocalStorage(),
};


const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    addHero: (state, action: PayloadAction<FavHero>) => {
      const isHeroExists = state.favHeroes.results.find((hero: FavHero) => hero.id === action.payload.id);
      if (isHeroExists) {
        toast.error("Hero already saved!")
      } else {
        state.favHeroes.results.push(action.payload);
        toast.success("Hero saved!")
      }
    },
    removeHero: (state, action: PayloadAction<FavHero>) => {
      const heroIndex = state.favHeroes.results.findIndex((hero) => hero.id === action.payload.id);    
      if (heroIndex !== -1) {
        state.favHeroes.results = state.favHeroes.results.filter(
          (_hero, index) => index !== heroIndex
        );    
        toast.success("Hero removed!");
      } else {
        toast.error("Hero not saved!");
      }
    }
  }
});

export const saveToLocalStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const { favHeroes } = store.getState().hero;
  if (typeof window !== "undefined") {
    localStorage.setItem("favHeroes", JSON.stringify(favHeroes));
  }
  return result;
};

export const { setSearch, addHero, removeHero } = heroSlice.actions;

export default heroSlice.reducer;
