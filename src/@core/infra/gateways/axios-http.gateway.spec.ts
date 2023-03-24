import axios, { AxiosResponse } from "axios";
import { AxiosHttpGateway } from "./axios-http.geteway";
import {  HttpResponse } from "../../protocols/httpClient"

//mocando instância do axios
jest.mock("axios");
//Axios sendo mocado e com as tipagens que existem no export default de axios
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Axios-http.gateway", () => {
  //Antes de executar
  beforeEach(() => {
    mockedAxios.create.mockClear();
    mockedAxios.request.mockClear();
  });

  it("should call axios with correct arguments and return valid response", async () => {
    const mockResult = { status: 200, data: { name: 'Bruno' } } as AxiosResponse;

    mockedAxios.create.mockReturnValue(mockedAxios);

    mockedAxios.request.mockResolvedValue(mockResult);

    const sut = new AxiosHttpGateway();

    const response = await sut.request({
      url: "localhost:3000",
      method: "get",
    });

    //Verifica se uma função foi chamada um determinado número de vezes
    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    //erifica se uma determinada função foi chamada com argumentos específicos
    expect(mockedAxios.create).toHaveBeenCalledWith({});
    //é uma expectativa que verifica se a função request do objeto chamada exatamente uma vez.
    //MUITO IMPORTANTE, pois é bom para saber se uma função está sendo chamada mais de uma vez sem precisão
    expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    //Testa se a função foi chamada com os seguintes argumentos:
    //no caso, um objeto com os valores que dei
    expect(mockedAxios.request).toHaveBeenCalledWith({
      method: "get",
      url: "localhost:3000",
    });
    //Testa se a minha respota da requição que fiz é igual a resposta mocada que havia criado
    expect(response).toEqual({
      statusCode: mockResult.status,
      data: mockResult.data,
    } as HttpResponse);
  });
});
