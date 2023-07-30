import { marvelApi } from "@/services/marvelApi";
import { CharactersApiResult } from "@/types/Character";
import { API_LINKS } from "./apiLinks";
import { PAGE_SIZE } from "./constants";
import { generateMd5Hash } from "./generateHash";

export async function getFirstEightCharacters(): Promise<CharactersApiResult> {
  const ts = Date.now();
  const { data } = await marvelApi.get<CharactersApiResult>(
    API_LINKS.characters,
    {
      params: {
        limit: PAGE_SIZE,
        offset: 0,
        ts: ts,
        hash: generateMd5Hash(ts),
      },
    }
  );
  return data;
}
