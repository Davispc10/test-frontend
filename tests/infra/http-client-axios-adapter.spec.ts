import axios from "axios";

import { HttpClientAxiosAdapter } from "@/infra/http";

jest.mock("axios", () => ({
  create: jest.fn(),
}));

const makeSut = () => {
  const sut = new HttpClientAxiosAdapter();
  return { sut };
};

describe("HttpClientAxios Adapter", () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let requestSpy: jest.Mock;
  let createSpy: jest.Mock;

  beforeAll(() => {
    requestSpy = jest.fn().mockReturnValue({
      status: 200,
      data: "any_data",
    });
    createSpy = jest.fn().mockReturnValue({
      request: requestSpy,
    });

    jest.mocked(axios.create).mockImplementation(createSpy);
  });

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  test("Should call axios with correct input", async () => {
    const { sut } = makeSut();
    await sut.request("any_url", "get");

    expect(requestSpy).toHaveBeenCalledWith({
      url: "any_url",
      method: "get",
    });
  });

  test("should return correct response on axios", async () => {
    const { sut } = makeSut();
    const result = await sut.request("any_url", "get");

    expect(result).toMatchObject({
      statusCode: 200,
      data: "any_data",
    });
  });

  test("should rethrow if axios throws", async () => {
    const { sut } = makeSut();
    requestSpy.mockRejectedValueOnce(new Error("request error"));
    const resultPriomise = sut.request("any_url", "get");
    await expect(resultPriomise).rejects.toThrow(new Error("request error"));
  });
});
