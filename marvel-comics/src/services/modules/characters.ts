import { api } from "../api";
import * as Types from "@/types";

export const getCharacters = async (
  offset: number,
  limit: number
): Promise<Types.CharactersList> => {
  return await api.get("/characters", { params: { offset, limit } });
};

export const getCharacterById = async (
  id: number
): Promise<Types.CharactersList> => {
  return await api.get(`/characters/${id}`);
};

export const getCharactersByName = async (
  nameStartsWith: string
): Promise<Types.CharactersList> => {
  return await api.get("/characters", { params: { nameStartsWith } });
};

export const getComic = async (id: number): Promise<Types.Comic> => {
  return await api.get(`/characters/${id}/comics`);
};