import { HttpClientAxiosAdapter } from "@/infra/http";

export const makeHttpClientAxiosAdapter = (): HttpClientAxiosAdapter => {
  return new HttpClientAxiosAdapter();
};
