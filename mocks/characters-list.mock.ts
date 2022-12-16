import { Character } from "@core/domain/entities/character";
import { Chance } from "chance";
import { mockCharacter } from "./character.mock";

export const mockCharactersList = (count: number = 20): Character[] => {
  return Array(count)
    .fill(0)
    .map(() => {
      return mockCharacter();
    });
};
