import { Container } from "inversify";
import { Registry } from "./registry";
import { AxiosHttpClient } from "../protocols/axios-http-client";
import axiosHttp from "../service/axios-http";
import { HttpClient } from "@core/data/protocols/http-client";
import { CharacterHttpAdapter } from "../adapters/character-http.adapter";
import { GetCharacterUseCase } from "@core/application/character/get-character.use-case";

export { Registry };
export const container = new Container();

/**
 * Axios Http Service. Path: src\@core\infra\service\axios-http.ts
 * Possui todas as instâncias criadas para o axios.
 */
container
  .bind<typeof axiosHttp>(Registry.AxiosHttpService)
  .toConstantValue(axiosHttp);

/**
 * Axios Http Client. Path: src\@core\infra\protocols\axios-http-client.ts
 * Um cliente http que será utilizado por adaptadores.
 */
container
  .bind<AxiosHttpClient>(Registry.AxiosHttpClient)
  .toFactory((context) => {
    const instance = context.container.get<typeof axiosHttp>(
      Registry.AxiosHttpService
    );
    type AxiosHttpServiceTypes = keyof typeof instance;

    return (
      service:
        | AxiosHttpServiceTypes
        | ConstructorParameters<typeof AxiosHttpClient>[0]
    ) => {
      const axiosHttpService =
        typeof service === "string" ? instance[service] : service;
      return new AxiosHttpClient(axiosHttpService);
    };
  });

/**
 * Character Http Adapter. Path: src\@core\infra\adapters\character-http.adapter.ts
 * Um adaptador http que busca informações dos personagens, que será usado por casos de usos.
 * [AxiosHttpClient] - Utilizando o client http do axios.
 */
container
  .bind<CharacterHttpAdapter>(Registry.CharacterHttpAdapter)
  .toDynamicValue((context) => {
    const axiosHttpClient = context.container.get<HttpClient>(
      Registry.AxiosHttpClient
    );

    return new CharacterHttpAdapter(axiosHttpClient);
  })
  .whenTargetNamed(Registry.AxiosHttpClient);

/**
 * Get Character Use Case. Path: src\@core\application\character\get-character.use-case.ts
 * Um caso de uso que busca informações dos personagens.
 *
 * [AxiosHttpClient] - Utilizando o client http do axios.
 * [CharacterHttpAdapter] - Utilizando o adaptador http para personagens.
 */
container
  .bind(Registry.GetCharacterUseCase)
  .toDynamicValue((context) => {
    const characterHttpAdapter = context.container.get<CharacterHttpAdapter>(
      Registry.CharacterHttpAdapter
    );

    return new GetCharacterUseCase(characterHttpAdapter);
  })
  .whenTargetTagged(Registry.CharacterHttpAdapter, Registry.AxiosHttpClient);
