import {
  IComicCharacterDataContainer,
  IComicDataWrapper,
} from "@/interfaces/CharacterComics";
import api from "@/services/api";

const fetchCharacters = async (
  id: number
): Promise<IComicCharacterDataContainer> => {
  try {
    const res = (await api.get("/characters/" + id + "/comics", {}))
      .data as IComicDataWrapper;

    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export { fetchCharacters };
