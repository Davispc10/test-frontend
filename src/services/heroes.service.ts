import { GetHeroesResponse } from "@/types/heroes";
import { AxiosPromise } from "axios";
import { api } from "./api";

export const HeroesServices = {
  getAll(offset: number, limit: number): AxiosPromise<GetHeroesResponse> {
    return api.get<GetHeroesResponse>(`/characters`, {
      params: { offset, limit },
    });
  },
};
