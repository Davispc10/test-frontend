import { POKEAPI_BASE_URL } from "./constants";

/**
 * Cliente HTTP para PokéAPI.
 * Centraliza fetch para facilitar mock em testes.
 */
export class PokeApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = POKEAPI_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    const url = path.startsWith("http") ? path : `${this.baseUrl}${path}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`PokéAPI error: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
  }
}

export const pokeApiClient = new PokeApiClient();
