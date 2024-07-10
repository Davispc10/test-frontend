import {
  ICharacterDataContainer,
  ICharacterDataWrapper,
} from "@/interfaces/Characters";
import api from "@/services/api";

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
    const res = (
      await api.get("/characters", {
        params: {
          limit: limit ? limit : 10,
          offset: offset ? offset : 0,
          nameStartsWith:
            nameStartsWith && nameStartsWith.length > 0
              ? nameStartsWith
              : undefined,
        },
      })
    ).data as ICharacterDataWrapper;

    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export { fetchCharacters };
