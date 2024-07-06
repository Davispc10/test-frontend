import { processCharacterData } from "../lib/processCharacter";
import api from "./axios";

export const fetchCharacter = async (id: string) => {
  const { data } = await api.get(`/characters/${id}`);
  return processCharacterData(data.data.results[0]);
};