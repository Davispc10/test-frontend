import { BASE_URL, publicKey } from "@/utils/utils";
import axios from "axios";
import { timestamp, hash } from "@/constants/constants";
import { Character } from "@/types/global";
import { logoMarvel, extensionImage } from "@/utils/utils";

interface FetchProps {
  id: string;
  timestamp: string;
}

export const fetchData = async ({ id, timestamp }: FetchProps) => {
  const noImage =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  try {
    const response = await axios.get(
      `${BASE_URL}/${id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    );
    const data = response.data.data.results[0];

    const newData = {
      ...data,
      thumbnail: {
        ...data.thumbnail,
        path: data.thumbnail.path.includes(noImage)
          ? logoMarvel
          : data.thumbnail.path,
        extension: data.thumbnail.extension.includes(extensionImage)
          ? extensionImage
          : data.thumbnail.extension,
      },
    };

    return newData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataComics = async ({ id, timestamp }: FetchProps) => {
  const noImage =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  try {
    const response = await axios.get(
      `${BASE_URL}/${id}/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    );
    const data = response.data.data.results;

    const newData = data.map((comic: Character) => {
      if (comic.thumbnail.path.includes(noImage)) {
        comic.thumbnail.path = logoMarvel;
        comic.thumbnail.extension = extensionImage;
      }
      return comic;
    });

    return newData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCharacters = async (offset: number) => {
  const noImage =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  try {
    const response = await axios.get(
      `${BASE_URL}?ts=${timestamp}&offset=${offset}&apikey=${publicKey}&hash=${hash}`
    );

    const data = response.data.data.results;

    const newData = data.map((hero: Character) => {
      if (hero.thumbnail.path.includes(noImage)) {
        hero.thumbnail.path = logoMarvel;
        hero.thumbnail.extension = extensionImage;
      }
      return hero;
    });

    return newData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataProps = async (offset: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?ts=${timestamp}&offset=${offset}&apikey=${publicKey}&hash=${hash}`
    );

    const data = response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearch = async (search: string) => {
  const noImage =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  try {
    const response = await axios.get(
      `${BASE_URL}?ts=${timestamp}&nameStartsWith=${search}&apikey=${publicKey}&hash=${hash}`
    );

    const data = response.data.data.results;
    console.log(data);
    const newData = data.map((hero: Character) => {
      if (hero.thumbnail.path.includes(noImage)) {
        hero.thumbnail.path = logoMarvel;
        hero.thumbnail.extension = extensionImage;
      }
      return hero;
    });

    return newData;
  } catch (error) {
    console.log(error);
  }
};
