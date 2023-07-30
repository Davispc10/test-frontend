import md5 from "md5";
import { api } from "@/services/api";

const publicKey = "7bfe41ebd0f4f4631c41dfe891402576";
const privateKey = "0f4fcdaac01df9619fdf63bcc699d2a5f87896be";

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

export async function getDetailHero(id: number) {
  try {
    const { data } = await api.get(
      `characters/${id}?ts=${time}&apikey=${publicKey}&hash=${hash}`
    );
    const heroesDetail = data?.data?.results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        description: result.description,
        thumbnail: `${result.thumbnail.path}.${result.thumbnail.extension}`,
      };
    });
    return heroesDetail;
  } catch (error) {
    console.log(error);
  }
}

export const getComics = async (id: number) => {
  try {
    const { data } = await api.get(
      `characters/${id}/comics?ts=${time}&apikey=${publicKey}&hash=${hash}`
    );
    const comics = data?.data?.results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        description: result.description,
        thumbnail: `${result.thumbnail.path}.${result.thumbnail.extension}`,
      };
    });
    return comics;
  } catch (error) {
    console.log(error);
  }
};
