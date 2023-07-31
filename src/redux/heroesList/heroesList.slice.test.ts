import { createSlice } from "@reduxjs/toolkit";
import heroesReducer, {
  setHeroes,
  changePage,
  updateOffSet,
  updateTotalPages,
} from "./slice";
import { GetHeroesResponse } from "@/types/heroes";
import { hero } from "@/mocks/heroes-mock";

describe("heroesSlice", () => {
  const initialState = {
    heroesList: [] as unknown as GetHeroesResponse,
    page: 0,
    totalPages: 0,
    itemsOffset: 0,
    perPage: 8,
  };

  it("should handle setHeroes reducer", () => {
    const heroesData = {
      data: {
        results: [hero],
      },
    };
    const action = setHeroes(heroesData);

    const state = heroesReducer(initialState, action);

    expect(state.heroesList.data.results).toEqual([hero]);
  });

  it("should handle changePage reducer", () => {
    const action = changePage(2);

    const state = heroesReducer(initialState, action);

    expect(state.page).toBe(2);
  });

  it("should handle updateTotalPages reducer", () => {
    const action = updateTotalPages({ total: 20, perPage: 5 });

    const state = heroesReducer(initialState, action);

    expect(state.totalPages).toBe(4);
  });

  it("should handle updateOffSet reducer", () => {
    const action = updateOffSet(8);

    const state = heroesReducer(initialState, action);

    expect(state.itemsOffset).toBe(8);
  });
});
