import {
  ICharacterDataContainer,
  ICharacterDataWrapper,
} from "@/interfaces/Characters";
import api from "@/services/api";

const fetchCharacterById = async (
  id: string
): Promise<ICharacterDataContainer> => {
  try {
    const res = (await api.get("/characters/" + id))
      .data as ICharacterDataWrapper;

    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export { fetchCharacterById };
