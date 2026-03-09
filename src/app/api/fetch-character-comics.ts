import { processComicData } from "../lib/processCharacter";
import api from "./axios";

export const fetchComics = async (characterId: string) => {
  const { data } = await api.get(`/characters/${characterId}/comics`);
  return data.data.results.map(processComicData);
};