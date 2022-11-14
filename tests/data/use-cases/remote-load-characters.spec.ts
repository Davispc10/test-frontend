import { characterMock } from "@/tests/domain/mocks";
import { RemoteLoadCharacters } from "@/data/use-cases";
import { backendCharacterMock, HttpClientSpy } from "@/tests/data/mocks";

const makeSut = () => {
  const httpClientStub = new HttpClientSpy();
  const sut = new RemoteLoadCharacters(httpClientStub);
  return { sut, httpClientStub };
};

describe("RemoteLoadCharacters Use Case", () => {
  test("should call httpClient with correct input", async () => {
    const { sut, httpClientStub } = makeSut();
    const requestSpy = jest.spyOn(httpClientStub, "request");
    await sut.loadAll(2, 50);

    expect(requestSpy).toHaveBeenCalledWith("/characters", "get", {
      params: {
        offset: 50,
        limit: 50,
      },
    });
  });

  test("should call httpClient with correct input and default params", async () => {
    const { sut, httpClientStub } = makeSut();
    const requestSpy = jest.spyOn(httpClientStub, "request");
    await sut.loadAll();

    expect(requestSpy).toHaveBeenCalledWith("/characters", "get", {
      params: {
        offset: 0,
        limit: 50,
      },
    });
  });

  test("should return a character list on success", async () => {
    const { sut } = makeSut();
    const result = await sut.loadAll();

    expect(result).toEqual([
      {
        ...backendCharacterMock(),
        thumbnail: `${backendCharacterMock().thumbnail.path}.${backendCharacterMock().thumbnail.extension}`,
      },
    ]);
  });

  test("should return default thumbnail when string is included", async () => {
    const { sut, httpClientStub } = makeSut();
    httpClientStub.data = {
      data: {
        results: [{ ...backendCharacterMock(), thumbnail: { path: "image_not_available", extension: "png" } }],
      },
    };
    const result = await sut.loadAll();

    expect(result).toEqual([
      {
        ...backendCharacterMock(),
        thumbnail:
          "https://midias.correiobraziliense.com.br/_midias/jpg/2021/05/03/675x450/1_marvel_studios_logo-6637962.jpeg?20220621151438?20220621151438",
      },
    ]);
  });

  test("should return default description when string is falsy", async () => {
    const { sut, httpClientStub } = makeSut();
    httpClientStub.data = {
      data: {
        results: [{ ...backendCharacterMock(), description: "" }],
        total: 50,
      },
    };
    const result = await sut.loadAll(1);

    expect(result).toEqual([
      {
        ...backendCharacterMock(),
        description: "description not informed",
        thumbnail: `${backendCharacterMock().thumbnail.path}.${backendCharacterMock().thumbnail.extension}`,
      },
    ]);
  });

  test("should rethrow if httpClient throws", async () => {
    const { sut, httpClientStub } = makeSut();
    jest.spyOn(httpClientStub, "request").mockRejectedValueOnce(new Error("request error"));
    const resultPromise = sut.loadAll();

    await expect(resultPromise).rejects.toThrow(new Error("request error"));
  });
});
