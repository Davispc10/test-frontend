import configureMockStore from "redux-mock-store";
import {
  selectedHeroSlice,
  setHero,
  setComics,
  setSeries,
  setStories,
  setEvents,
} from "./slice";
import { hero } from "@/mocks/heroes-mock";
import { Hero } from "@/types/heroes";
import { GetComicsResponse } from "@/types/comics";
import { GetSeriesResponse } from "@/types/series";
import { GetStoriesResponse } from "@/types/stories";
import { GetEventsResponse } from "@/types/events";

const mockStore = configureMockStore();
const initialState = {
  selectedHero: {} as Hero,
  comics: {} as GetComicsResponse,
  series: {} as GetSeriesResponse,
  stories: {} as GetStoriesResponse,
  events: {} as GetEventsResponse,
};

describe("selectedHeroSlice", () => {
  it("should handle setHero reducer", () => {
    const store = mockStore(initialState);

    const expectedAction = { type: "selectedHero/setHero", payload: hero };
    store.dispatch(setHero(hero));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should handle setComics reducer", () => {
    const comicsData = {
      data: {
        results: hero.comics,
      },
    };
    const store = mockStore(initialState);

    const expectedAction = {
      type: "selectedHero/setComics",
      payload: comicsData,
    };
    store.dispatch(setComics(comicsData));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should handle setSeries reducer", () => {
    const seriesData = {
      data: { results: hero.series },
    };
    const store = mockStore(initialState);

    const expectedAction = {
      type: "selectedHero/setSeries",
      payload: seriesData,
    };
    store.dispatch(setSeries(seriesData));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should handle setStories reducer", () => {
    const storiesData = {
      data: { results: hero.stories },
    };
    const store = mockStore(initialState);

    const expectedAction = {
      type: "selectedHero/setStories",
      payload: storiesData,
    };
    store.dispatch(setStories(storiesData));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should handle setEvents reducer", () => {
    const eventsData = {
      data: { results: hero.events },
    };
    const store = mockStore(initialState);

    const expectedAction = {
      type: "selectedHero/setEvents",
      payload: eventsData,
    };
    store.dispatch(setEvents(eventsData));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
