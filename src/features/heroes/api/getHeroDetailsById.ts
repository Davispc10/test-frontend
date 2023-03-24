import { axios } from "@/lib/axios";
import { Hero } from "../types/hero";
import { HeroesApiResponse } from "../types/heroesApiResponse";

interface GetHeroDetailsByIdParams {
  id: number;
}

export function getHeroDetailsById({
  id,
}: GetHeroDetailsByIdParams): Promise<Hero> {
  return axios
    .get<HeroesApiResponse>(`/characters/${id}`)
    .then((response) => {
      const hero = response.data.data.results[0];
      const heroDetails = {
        id: hero.id,
        name: hero.name,
        description:
          hero.description === ""
            ? "Description not informed"
            : hero.description,
        thumbnail: hero.thumbnail.path.includes("image_not_available")
          ? {
              path: "/images/marvel-logo",
              extension: "png",
            }
          : hero.thumbnail,
      };

      return heroDetails;
    })
    .catch((error) => {
      throw error;
    });
}
