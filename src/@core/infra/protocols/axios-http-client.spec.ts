import axios, { AxiosResponse } from "axios";
import { AxiosHttpClient } from "./axios-http-client";
import type { HttpResponse } from "../../data/protocols/http-client";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

beforeAll(() => {
  jest.resetModules();
  jest.resetAllMocks();
  mockedAxios.create.mockClear();
  mockedAxios.request.mockClear();
});

describe("AxiosHttpClient", () => {
  it("should bring the expected return in one call", async () => {
    const mockResult = { status: 200, data: "ok" } as AxiosResponse;

    mockedAxios.create = jest.fn();
    mockedAxios.create.mockReturnValue(mockedAxios);

    mockedAxios.request.mockImplementation(() => Promise.resolve(mockResult));

    const sut = makeSut();

    const result = await sut.request({
      url: "/test",
      method: "get",
    });

    // Checa se a função de criar um instância do axios foi chamada apenas uma única vez
    expect(mockedAxios.create).toHaveBeenCalledTimes(1);

    // Checa se a função de request foi chamada apenas uma única vez.
    expect(mockedAxios.request).toHaveBeenCalledTimes(1);

    // Checa se foi possível obter o retorno esperado
    expect(result).toMatchObject({
      statusCode: mockResult.status,
      data: mockResult.data,
    } as HttpResponse);
  });
});

export {};
