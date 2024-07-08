import {
  ICharacterDataContainer,
  ICharacterDataWrapper,
} from "../interfaces/Characters";
import { api } from "../services/api";
import md5 from "md5";

type filterProps = {
  nameStartsWith?: string;
  limit?: number;
  offset?: number;
};

const fetchCharacters = async ({
  limit,
  offset,
  nameStartsWith,
}: filterProps): Promise<ICharacterDataContainer> => {
  try {
    const limitQuery = limit ? `&limit=${limit}` : "&limit=10";
    const offsetQuery = offset ? `&offset=${offset}` : "&offset=0";
    const filterByNameQuery = nameStartsWith
      ? `&nameStartsWith=${nameStartsWith}`
      : "";
    const time = Number(new Date());

    const privateKey = "a9130112f093b6682a06b76fbac725f1b25bc1ce";
    const publicKey = "7909a009f0cb54ee9465ad6202b87109";

    const hash = md5(time + privateKey + publicKey);

    const url = `/v1/public/characters?ts=${time}${limitQuery}${offsetQuery}${filterByNameQuery}&apikey=${publicKey}&hash=${hash}`;

    const res = (await api.get(url)).data as ICharacterDataWrapper;

    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export { fetchCharacters };
