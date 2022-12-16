import { CharacterHttpAdapter } from "./character-http.adapter";

import { Character } from "../../domain/entities/character";
import {
  mockMarvelComicHttp,
  mockMarvelHttpComicResponseOK,
  mockMarvelHttpListComicsResponseOK,
} from "@mocks/marvel-http-comics.mock";
import { Comic } from "@core/domain/entities/comic";
import {
  mockMarvelHttpCharacterResponseOK,
  mockMarvelHttpListCharactersResponseOK,
} from "@mocks/marvel-http-characters.mock";
import { ComicHttpAdapter } from "./comic-http.adapter";

const mockHttpClient = jest.fn();

const makeSut = (): ComicHttpAdapter => {
  return new ComicHttpAdapter(mockHttpClient());
};

beforeAll(() => {
  jest.resetModules();
  jest.resetAllMocks();
  mockHttpClient.mockClear();
});

describe("ComicHttpAdapter", () => {
  it("should return a list of comics", async () => {
    // Quantos comics queremos no mock.
    const comicsCount = 2;
    const mockResult = mockMarvelHttpListComicsResponseOK(comicsCount);

    mockHttpClient.mockReturnValueOnce({
      request: jest.fn().mockImplementation(() => Promise.resolve(mockResult)),
    });

    const sut = makeSut();

    const result = await sut.findAll({
      limit: 20,
      offset: 0,
      orderBy: "title",
    });

    // Checa se o resultado é diferente do mockResult
    expect(mockResult).not.toEqual(result);

    // Checa se o resultado é diferente de nulo
    expect(result).not.toBeNull();

    // Checa se nosso resultado é uma lista
    expect(Array.isArray(result?.comics)).toBe(true);

    // Checa se nossa lista é uma lista com o tipo Comic.
    expect(result?.comics instanceof Array<Comic>).toBe(true);

    // Checa se nossa lista tem o tamanho que queremos.
    expect(result?.comics?.length).toBe(2);

    // Checa se nossa lista tem o tamanho dos retornados
    expect(result?.comics?.length).toBe(result?.returned);

    // Checa se o primeiro elemento da lista é do tipo Comic.
    expect(result?.comics[0] instanceof Comic).toBe(true);

    const resultFirst = result?.comics[0] as Comic;
    const mockComicFirst = mockResult.data.data.results[0] as any;

    // Checa se o primeiro elemento da lista tem os mesmos valores dos atributos de Comic do nosso mock.
    expect(resultFirst.toJSON()).toMatchObject(
      new Comic({
        id: mockComicFirst.id,
        description: mockComicFirst.description,
        title: mockComicFirst.title,
        modified: mockComicFirst.modified,
        thumbnail: mockComicFirst.thumbnail,
      }).toJSON()
    );
  });

  it("should return a list of characters by comic id", async () => {
    const charactersCount = 2;
    const mockResult = mockMarvelHttpListCharactersResponseOK(charactersCount);

    mockHttpClient.mockReturnValueOnce({
      request: jest.fn().mockImplementation(() => Promise.resolve(mockResult)),
    });

    const sut = makeSut();

    const result = await sut.findCharactersById(1, {
      limit: 20,
      offset: 0,
      orderBy: "name",
    });

    // Checa se o resultado é diferente do mockResult
    expect(mockResult).not.toEqual(result);

    // Checa se o resultado é diferente de nulo
    expect(result).not.toBeNull();

    // Checa se nosso resultado é uma lista
    expect(Array.isArray(result?.characters)).toBe(true);

    // Checa se nossa lista é uma lista com o tipo Character.
    expect(result?.characters instanceof Array<Character>).toBe(true);

    // Checa se nossa lista tem o tamanho que queremos.
    expect(result?.characters?.length).toBe(charactersCount);

    // Checa se nossa lista tem o tamanho dos retornados
    expect(result?.characters?.length).toBe(result?.returned);

    // Checa se o primeiro elemento da lista é do tipo Character.
    expect(result?.characters[0] instanceof Character).toBe(true);

    const resultFirst = result?.characters[0] as Character;
    const mockCharacterFirst = mockResult.data.data.results[0] as any;

    // Checa se o primeiro elemento da lista tem os mesmos valores dos atributos de Character do nosso mock.
    expect(resultFirst.toJSON()).toMatchObject(
      new Character({
        id: mockCharacterFirst.id,
        description: mockCharacterFirst.description,
        name: mockCharacterFirst.name,
        modified: mockCharacterFirst.modified,
        thumbnail: mockCharacterFirst.thumbnail,
      }).toJSON()
    );
  });

  it("should return a comic", async () => {
    const mockResult = mockMarvelHttpComicResponseOK();

    mockHttpClient.mockReturnValueOnce({
      request: jest.fn().mockImplementation(() => Promise.resolve(mockResult)),
    });

    const sut = makeSut();

    const result = await sut.findById(mockResult.data.data.results[0].id);

    // Checa se o resultado é diferente do mockResult
    expect(mockResult).not.toEqual(result);

    // Checa se o resultado é do tipo Comic.
    expect(result instanceof Comic).toBe(true);

    const mockCharacter = mockResult.data.data.results[0] as any;

    // Checa se o resultado tem os mesmos valores dos atributos de Comic do nosso mock.
    expect(result.toJSON()).toMatchObject(
      new Comic({
        id: mockCharacter.id,
        description: mockCharacter.description,
        title: mockCharacter.title,
        modified: mockCharacter.modified,
        thumbnail: mockCharacter.thumbnail,
      }).toJSON()
    );
  });

  it("should return an error when commics cannot be accessed", async () => {
    mockHttpClient.mockReturnValueOnce({
      request: jest.fn().mockImplementation(() => Promise.reject(new Error())),
    });

    const sut = makeSut();

    await expect(
      sut.findAll({
        limit: 20,
        offset: 0,
        orderBy: "title",
      })
    ).rejects.toThrow();
    await expect(sut.findById(1)).rejects.toThrow();
  });

  it("should return null when comic cannot be found", async () => {
    const mockResult = mockMarvelHttpComicResponseOK();

    mockResult.data.data.results = [];

    mockHttpClient.mockReturnValueOnce({
      request: jest.fn().mockImplementation(() => Promise.resolve(mockResult)),
    });

    const sut = makeSut();

    const result = await sut.findById(0);

    expect(result).toBe(null);
  });

  it("should return an error when array of comics cannot be found in findById", async () => {
    const mockResult = mockMarvelHttpComicResponseOK();

    delete mockResult.data.data.results;

    mockHttpClient.mockReturnValueOnce({
      request: jest.fn().mockImplementation(() => Promise.resolve(mockResult)),
    });

    const sut = makeSut();

    await expect(sut.findById(0)).rejects.toThrow();
  });

  it("should return an error when array of comics cannot be found in findAll", async () => {
    const mockResult = mockMarvelHttpListComicsResponseOK(2);

    delete mockResult.data.data.results;

    mockHttpClient.mockReturnValueOnce({
      request: jest.fn().mockImplementation(() => Promise.resolve(mockResult)),
    });

    const sut = makeSut();

    await expect(
      sut.findAll({
        limit: 20,
        offset: 0,
        orderBy: "title",
      })
    ).rejects.toThrow();
  });
});

export {};
