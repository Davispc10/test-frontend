import { axios } from "@/lib/axios";
import { HeroesApiResponse } from "../types/heroesApiResponse";

export function getTotalHeroCount(search?: string): Promise<number> {
  return axios
    .get<HeroesApiResponse>("/characters", {
      params: {
        nameStartsWith: search,
      },
    })
    .then(({ data }) => {
      return data.data.total;
    })
    .catch((error) => {
      console.error(error);
      return 0;
    });
}
