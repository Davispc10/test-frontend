import { axios } from "@/lib/axios";
import { HeroesApiResponse } from "../types/heroesApiResponse";

export function getTotalHeroCount(): Promise<number> {
  return axios
    .get<HeroesApiResponse>("/characters")
    .then(({ data }) => {
      return data.data.total;
    })
    .catch((error) => {
      console.error(error);
      return 0;
    });
}
