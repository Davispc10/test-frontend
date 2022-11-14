import { LoadCharactersComics } from "@/domain/features";
import { RemoteLoadCharacterComics } from "@/data/use-cases";
import { makeHttpClientAxiosAdapter } from "@/main/factories/infra";

export const makeLoadCharactersComics = (): LoadCharactersComics => {
  const httpClient = makeHttpClientAxiosAdapter();
  return new RemoteLoadCharacterComics(httpClient);
};
