import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PokeApiClient } from "./pokeapi-client";

describe("PokeApiClient", () => {
  const BASE_URL = "https://pokeapi.co/api/v2";
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("concatena baseUrl quando path é relativo", async () => {
    const client = new PokeApiClient(BASE_URL);
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: "test" }),
    });

    await client.get("/pokemon/1");

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/pokemon/1`);
  });

  it("usa URL diretamente quando path começa com http", async () => {
    const client = new PokeApiClient(BASE_URL);
    const fullUrl = "https://example.com/evolution-chain/10/";
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ chain: {} }),
    });

    await client.get(fullUrl);

    expect(fetchMock).toHaveBeenCalledWith(fullUrl);
  });

  it("retorna JSON parseado", async () => {
    const client = new PokeApiClient(BASE_URL);
    const mockData = { id: 1, name: "bulbasaur" };
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await client.get<{ id: number; name: string }>("/pokemon/1");

    expect(result).toEqual(mockData);
  });

  it("lança erro quando res.ok é false", async () => {
    const client = new PokeApiClient(BASE_URL);
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(client.get("/pokemon/99999")).rejects.toThrow(
      "PokéAPI error: 404 Not Found"
    );
  });
});
