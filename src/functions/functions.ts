import { BASE_URL, privateKey, publicKey } from "@/utils/utils";
import axios from "axios";
import {
  timestamp,
  offset,
  hash,
  pageNumber,
  pageSize,
  totalPages,
} from "@/constants/constants";

interface FetchProps {
  id: string;
  timestamp: string;
}

export const fetchData = async ({ id, timestamp }: FetchProps) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    );
    const data = response.data.data.results[0];

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchDataComics = async ({ id, timestamp }: FetchProps) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${id}/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    );
    const data = response.data.data.results;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCharacters = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}?ts=${timestamp}&offset=${offset}&apikey=${publicKey}&hash=${hash}`
    );
    const data = response.data.data.results;

    return data;
  } catch (error) {
    console.log(error);
  }
};


