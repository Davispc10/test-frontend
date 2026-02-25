import { processCharacterData } from "../lib/processCharacter";
import api from "./axios";

export const fetchCharacters = async (page: number, name: string) => {
  try {
    const params = {
      offset: (page - 1) * 20,
      ...(name && { nameStartsWith: name }),
    };

    const { data } = await api.get('/characters', { params });

    if (!data || !data.data || !data.data.results) {
      throw new Error('Dados inválidos retornados pela API');
    }

    const processedData = data.data.results.map(processCharacterData);
    return {
      characters: processedData,
      total: data.data.total
    };
  } catch (error) {
    console.error('Erro ao buscar personagens: ', error);
    throw error;
  }
};