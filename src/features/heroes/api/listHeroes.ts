import { HERO_RETURN_LIMIT } from "@/config";
import { axios } from "@/lib/axios";
import { Hero } from "../types/hero";
import { HeroesApiResponse } from "../types/heroesApiResponse";

interface ListHeroesParams {
  page: number;
  nameStartsWith?: string;
}

export function listHeroes({
  page,
  nameStartsWith,
}: ListHeroesParams): Promise<Hero[]> {
  const limit = HERO_RETURN_LIMIT;
  const offset = (page - 1) * limit;

  return axios
    .get<HeroesApiResponse>("/characters", {
      params: {
        limit,
        offset,
        nameStartsWith,
      },
    })
    .then((response) => {
      // checar se há descrição, se não houver, colocar uma descrição padrão
      // checar se há imagem, se não houver, colocar uma imagem padrão
      const heroes = response.data.data.results.map((hero) => ({
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
      }));

      return heroes;
    });
}
