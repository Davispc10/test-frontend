import { Character } from "@/domain/models";

export interface LoadCharacters {
  loadAll: (page: number, limit: number) => Promise<Character[]>;
}
