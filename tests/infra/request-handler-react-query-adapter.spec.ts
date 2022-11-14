import { useQuery } from "react-query";

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));

import { RequestHandlerReactQueryAdapter } from "@/infra/externals";

const makeSut = () => {
  const sut = new RequestHandlerReactQueryAdapter();
  return { sut };
};

describe("requestHandlerReactQuery Adapter", () => {
  let useQuerySpy: jest.Mock;

  beforeAll(() => {
    useQuerySpy = jest.fn().mockReturnValue({
      isLoading: false,
      data: "any_data",
      error: null,
    });
    jest.mocked(useQuery).mockImplementation(useQuerySpy);
  });

  test("should call useQuery with correct input", () => {
    const { sut } = makeSut();

    const callback = async () => Promise.resolve();
    sut.handle("any_query_key", callback);

    expect(useQuerySpy).toHaveBeenCalledWith({
      queryKey: "any_query_key",
      queryFn: callback,
    });
  });

  test("should return correct data on success", () => {
    const { sut } = makeSut();

    const callback = async () => Promise.resolve();
    const result = sut.handle("any_query_key", callback);

    expect(result).toEqual({
      isLoading: false,
      data: "any_data",
    });
  });

  test("should return correct data on failure", () => {
    const { sut } = makeSut();
    useQuerySpy.mockReturnValueOnce({
      isLoading: false,
      data: null,
      error: "any_error",
    });

    const callback = async () => Promise.resolve();
    const result = sut.handle("any_query_key", callback);

    expect(result).toEqual({
      isLoading: false,
      data: null,
      error: "Erro inesperado",
    });
  });

  test("should return correct data on failure", () => {
    const { sut } = makeSut();
    useQuerySpy.mockReturnValueOnce({
      isLoading: false,
      data: null,
      error: {
        response: {
          data: {
            status: "any_error"
          },
        },
      },
    });

    const callback = async () => Promise.resolve();
    const result = sut.handle("any_query_key", callback);

    expect(result).toEqual({
      isLoading: false,
      data: null,
      error: "any_error",
    });
  });
});
