import { api } from "./api";
import { AxiosPromise } from "axios";
import { GetSeriesResponse } from "@/types/series";
import { GetEventsResponse } from "@/types/events";
import { GetComicsResponse } from "@/types/comics";
import { GetHeroesResponse } from "@/types/heroes";
import { GetStoriesResponse } from "@/types/stories";

class HeroService {
  private readonly endpoint = "/characters";
  private readonly api = api;

  getAll(
    offset: number,
    limit: number,
    nameStartsWith = ""
  ): AxiosPromise<GetHeroesResponse> {
    const params: { offset: number; limit: number; nameStartsWith?: string } = {
      offset,
      limit,
    };

    if (nameStartsWith.length > 0) {
      params.nameStartsWith = nameStartsWith;
    }

    return this.api.get<GetHeroesResponse>(this.endpoint, {
      params,
    });
  }

  getHeroData(heroId: number): AxiosPromise<GetHeroesResponse> {
    return this.api.get(`${this.endpoint}/${heroId}`);
  }

  getHeroComics(heroId: number): AxiosPromise<GetComicsResponse> {
    return this.api.get(`${this.endpoint}/${heroId}/comics`);
  }

  getHeroSeries(heroId: number): AxiosPromise<GetSeriesResponse> {
    return this.api.get(`${this.endpoint}/${heroId}/series`);
  }

  getHeroEvents(heroId: number): AxiosPromise<GetEventsResponse> {
    return this.api.get(`${this.endpoint}/${heroId}/events`);
  }

  getHeroStories(heroId: number): AxiosPromise<GetStoriesResponse> {
    return this.api.get(`${this.endpoint}/${heroId}/stories`);
  }
}
// TODO - se fizer sentido, refatorar para usar classes
export default new HeroService();

export const HeroesServices = {
  getAll(
    offset: number,
    limit: number,
    nameStartsWith = ""
    // isBySearch = false
  ): AxiosPromise<GetHeroesResponse> {
    const params: { offset: number; limit: number; nameStartsWith?: string } = {
      offset,
      limit,
    };

    if (nameStartsWith.length > 0) {
      params.nameStartsWith = nameStartsWith;
    }

    return api.get<GetHeroesResponse>(`/characters`, {
      params,
    });
  },

  getHeroData(heroId: number): AxiosPromise<GetHeroesResponse> {
    return api.get(`/characters/${heroId}`);
  },

  getHeroComics(heroId: number): AxiosPromise<GetComicsResponse> {
    return api.get(`/characters/${heroId}/comics`);
  },

  getHeroSeries(heroId: number): AxiosPromise<GetSeriesResponse> {
    return api.get(`/characters/${heroId}/series`);
  },

  getHeroEvents(heroId: number): AxiosPromise<GetEventsResponse> {
    return api.get(`/characters/${heroId}/events`);
  },

  getHeroStories(heroId: number): AxiosPromise<GetStoriesResponse> {
    return api.get(`/characters/${heroId}/stories`);
  },
};
