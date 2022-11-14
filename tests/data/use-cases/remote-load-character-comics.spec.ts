import { RemoteLoadCharacterComics } from "@/data/use-cases";
import { HttpClientSpy } from "@/tests/data/mocks";
import { backendComicMock } from "@/tests/data/mocks";

const makeSut = () => {
  const httpClientStub = new HttpClientSpy();
  httpClientStub.data = {
    data: {
      results: [backendComicMock()],
      total: 50,
    },
  };
  const sut = new RemoteLoadCharacterComics(httpClientStub);
  return { sut, httpClientStub };
};

describe("RemoteLoadCharacterComics Use Case", () => {
  test("should call httpClient with correct input", async () => {
    const { sut, httpClientStub } = makeSut();
    const requestSpy = jest.spyOn(httpClientStub, "request");
    await sut.loadAll(1, 1, 10);

    expect(requestSpy).toHaveBeenCalledWith("/characters/1/comics", "get", {
      params: {
        offset: 0,
        limit: 10
      }
    });
  });

  test("should call httpClient with correct input and default params", async () => {
    const { sut, httpClientStub } = makeSut();
    const requestSpy = jest.spyOn(httpClientStub, "request");
    await sut.loadAll(1);

    expect(requestSpy).toHaveBeenCalledWith("/characters/1/comics", "get", {
      params: {
        offset: 0,
        limit: 12,
      },
    });
  });

  test("should return a list of comics on success", async () => {
    const { sut } = makeSut();
    const result = await sut.loadAll(1, 1, 10);

    expect(result).toMatchObject({
      comics: [{
        ...backendComicMock(),
        thumbnail: `${backendComicMock().thumbnail.path}.${backendComicMock().thumbnail.extension}`,
      }],
      totalComics: 50,
    });
  });

  test("should return default thumbnail when string is included", async () => {
    const { sut, httpClientStub } = makeSut();
    httpClientStub.data = {
      data: {
        results: [{ ...backendComicMock(), thumbnail: { path: "image_not_available", extension: "png" } }],
        total: 50
      },
    }
    const result = await sut.loadAll(1);

    expect(result).toMatchObject({
      comics: [{
        ...backendComicMock(),
        thumbnail: "https://midias.correiobraziliense.com.br/_midias/jpg/2021/05/03/675x450/1_marvel_studios_logo-6637962.jpeg?20220621151438?20220621151438",
      }],
      totalComics: 50,
    });
  });

  test("should return default description when string is falsy", async () => {
    const { sut, httpClientStub } = makeSut();
    httpClientStub.data = {
      data: {
        results: [{ ...backendComicMock(), description: "" }],
        total: 50
      },
    }
    const result = await sut.loadAll(1);

    expect(result).toMatchObject({
      comics: [{
        ...backendComicMock(),
        description: "description not informed",
        thumbnail: `${backendComicMock().thumbnail.path}.${backendComicMock().thumbnail.extension}`,
      }],
      totalComics: 50,
    });
  });

  test("should rethrow if httpClient throws", async () => {
    const { sut, httpClientStub } = makeSut();
    jest.spyOn(httpClientStub, "request").mockRejectedValueOnce(new Error("request error"));
    const resultPromise = sut.loadAll(1, 1, 10);

    await expect(resultPromise).rejects.toThrow(new Error("request error"));
  });
});
