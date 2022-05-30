import { api } from "../api";
import * as Types from "@/types";

export const getCharacters = async (
  offset: number,
  limit: number
): Promise<Types.CharactersList> => {
  return await api.get("/characters", { params: { offset, limit } });
};

export const getCharacter = async (id: number): Promise<Types.Characters> => {
  return await api.get(`/characters/${id}`);
};
