import { Comic, GetComicsResponse } from "@/types/comics";
import { GetEventsResponse } from "@/types/events";
import { Hero, SelectedHeroReducerData } from "@/types/heroes";
import { GetSeriesResponse } from "@/types/series";
import { GetStoriesResponse } from "@/types/stories";
import { createSlice } from "@reduxjs/toolkit";
import Placeholder from "/public/images/placeholder.jpg";

const initialState: SelectedHeroReducerData = {
  selectedHero: {} as Hero,
  comics: {} as GetComicsResponse,
  series: {} as GetSeriesResponse,
  stories: {} as GetStoriesResponse,
  events: {} as GetEventsResponse,
};

const defaultDescription = "Descrição não informada";
const defaultThumbnailUrl = "/_next/static/media/placeholder.43193f81";
const defaultThumbnailExtension = "jpg";

const handleFillHeroData = (hero: Hero) => {
  const filledHero = {
    ...hero,
    description: hero.description || defaultDescription,
    thumbnail: {
      path: hero.thumbnail.path || defaultThumbnailUrl,
      extension: hero.thumbnail.extension || defaultThumbnailExtension,
    },
  };

  return filledHero;
};

const handleSetComicDefaultData = (comicsList: Comic[]) => {
  const filteredData = comicsList.map((comic) => {
    if (
      !comic.thumbnail ||
      comic.thumbnail.path.length < 0 ||
      comic.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    ) {
      comic.thumbnail = {
        path: defaultThumbnailUrl,
        extension: defaultThumbnailExtension,
      };
    }

    return comic;
  });

  return filteredData;
};

const handleSetStoriesDefaultData = (storiesList: Comic[]) => {
  const filteredData = storiesList.map((story) => {
    if (
      !story.thumbnail ||
      story.thumbnail.path.length < 0 ||
      story.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    ) {
      story.thumbnail = {
        path: defaultThumbnailUrl,
        extension: defaultThumbnailExtension,
      };
    }

    return story;
  });

  return filteredData;
};

const handleSetEventsDefaultData = (eventsList: Comic[]) => {
  const filteredData = eventsList.map((event) => {
    if (
      !event.thumbnail ||
      event.thumbnail.path.length < 0 ||
      event.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    ) {
      event.thumbnail = {
        path: defaultThumbnailUrl,
        extension: defaultThumbnailExtension,
      };
    }

    return event;
  });

  return filteredData;
};

const handleSetSeriesDefaultData = (seriesList: Comic[]) => {
  const filteredData = seriesList.map((serie) => {
    if (
      !serie.thumbnail ||
      serie.thumbnail.path.length < 0 ||
      serie.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    ) {
      serie.thumbnail = {
        path: defaultThumbnailUrl,
        extension: defaultThumbnailExtension,
      };
    }

    return serie;
  });

  return filteredData;
};

export const selectedHeroSlice = createSlice({
  name: "selectedHero",
  initialState,
  reducers: {
    setHero: (state, action) => {
      const filledData = handleFillHeroData(action.payload);
      state.selectedHero = filledData;
    },

    setComics: (state, action) => {
      const filledData = handleSetComicDefaultData(action.payload.data.results);
      const comicsList: GetComicsResponse = {
        ...action.payload,
        data: { results: filledData },
      };

      state.comics = comicsList;
    },

    setSeries: (state, action) => {
      const filledData = handleSetSeriesDefaultData(
        action.payload.data.results
      );
      const seriesList: GetSeriesResponse = {
        ...action.payload,
        data: { results: filledData },
      };
      state.series = seriesList;
    },

    setStories: (state, action) => {
      const filledData = handleSetStoriesDefaultData(
        action.payload.data.results
      );
      const storiesList: GetStoriesResponse = {
        ...action.payload,
        data: { results: filledData },
      };

      console.log("storiesList:", storiesList);

      state.stories = storiesList;
    },

    setEvents: (state, action) => {
      const filledData = handleSetEventsDefaultData(
        action.payload.data.results
      );
      const storiesEvents: GetEventsResponse = {
        ...action.payload,
        data: { results: filledData },
      };
      state.events = storiesEvents;
    },
  },
});

export default selectedHeroSlice.reducer;
export const { setHero, setComics, setEvents, setSeries, setStories } =
  selectedHeroSlice.actions;
