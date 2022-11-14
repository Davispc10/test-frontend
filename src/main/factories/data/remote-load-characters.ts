import { RemoteLoadCharacters } from "@/data/use-cases";
import { makeHttpClientAxiosAdapter } from "@/main/factories/infra";

export const makeRemoteLoadCharacters = (): RemoteLoadCharacters => {
  const httpClient = makeHttpClientAxiosAdapter();
  return new RemoteLoadCharacters(httpClient);
};
