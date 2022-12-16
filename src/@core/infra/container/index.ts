import { Container, interfaces } from "inversify";
import { Registry } from "./registry";
import { AxiosHttpClient } from "../protocols/axios-http-client";
import axiosHttp from "../service/axios-http";
import { CharacterHttpAdapter } from "../adapters/character-http.adapter";
import { GetCharacterUseCase } from "@core/application/character/get-character.use-case";
import { AxiosInstance } from "axios";
import { ListCharactersUseCase } from "@core/application/character/list-characters.use-case";
import { ListComicsByCharacterUseCase } from "@core/application/character/list-comics-by-character.use-case";
import { ListAllCharactersUseCase } from "@core/application/character/list-all-characters.use-case";

export { Registry };
export const container = new Container();

/**
 * Axios Marvel Api Http Service. Path: src\@core\infra\service\axios-http.ts
 * @return AxiosInstance of marvel api.
 */
container
  .bind<AxiosInstance>(Registry.AxiosMarvelApiHttpService)
  .toConstantValue(axiosHttp.marvelHttpApi);

/**
 * Axios Http Client. Path: src\@core\infra\protocols\axios-http-client.ts
 * @return AxiosHttpClient without axios http service.
 */
container.bind<AxiosHttpClient>(Registry.AxiosHttpClient).toDynamicValue(() => {
  return new AxiosHttpClient();
});

/**
 * Axios Http Client. Path: src\@core\infra\protocols\axios-http-client.ts
 * @return AxiosHttpClient with marvel api http service.
 */
container
  .bind<AxiosHttpClient>(Registry.AxiosMarvelApiHttpClient)
  .toDynamicValue((context) => {
    return new AxiosHttpClient(
      context.container.get<AxiosInstance>(Registry.AxiosMarvelApiHttpService)
    );
  });

/**
 * Character Http Adapter. Path: src\@core\infra\adapters\character-http.adapter.ts
 * @return CharacterHttpAdapter with axios marvel api http client.
 */
container
  .bind<CharacterHttpAdapter>(Registry.CharacterHttpAdapter)
  .toDynamicValue((context) => {
    const axiosHttpClient = context.container.get<AxiosHttpClient>(
      Registry.AxiosMarvelApiHttpClient
    );

    return new CharacterHttpAdapter(axiosHttpClient);
  })
  // Se o CharacterHttpAdapter for injetado com o tag AxiosHttpClient, ele irá retornar o CharacterHttpAdapter com o AxiosMarvelApiHttpClient.
  .whenTargetNamed(Registry.AxiosHttpClient);

/**
 * List Characters Use Case. Path: src\@core\application\character\list-characters.use-case.ts
 *
 * @return ListCharactersUseCase with CharacterHttpAdapter with AxiosMarvelApiHttpClient.
 */
container
  .bind<ListCharactersUseCase>(Registry.ListCharactersUseCase)
  .toDynamicValue((context) => {
    const characterHttpAdapter =
      context.container.getNamed<CharacterHttpAdapter>(
        Registry.CharacterHttpAdapter,
        Registry.AxiosHttpClient
      );

    return new ListCharactersUseCase(characterHttpAdapter);
  })
  .whenTargetNamed(Registry.CharacterHttpAdapter);

/**
 * Get Character Use Case. Path: src\@core\application\character\get-character.use-case.ts
 *
 * @return GetCharacterUseCase with CharacterHttpAdapter with AxiosMarvelApiHttpClient.
 */
container
  .bind<GetCharacterUseCase>(Registry.GetCharacterUseCase)
  .toDynamicValue((context) => {
    const characterHttpAdapter =
      context.container.getNamed<CharacterHttpAdapter>(
        Registry.CharacterHttpAdapter,
        Registry.AxiosHttpClient
      );

    return new GetCharacterUseCase(characterHttpAdapter);
  })
  .whenTargetNamed(Registry.CharacterHttpAdapter);

/**
 * List All Characters Use Case. Path: src\@core\application\character\list-all-characters.use-case.ts
 *
 * @return ListAllCharactersUseCase with CharacterHttpAdapter with AxiosMarvelApiHttpClient.
 */
container
  .bind<ListAllCharactersUseCase>(Registry.ListAllCharactersUseCase)
  .toDynamicValue((context) => {
    const characterHttpAdapter =
      context.container.getNamed<CharacterHttpAdapter>(
        Registry.CharacterHttpAdapter,
        Registry.AxiosHttpClient
      );

    return new ListAllCharactersUseCase(characterHttpAdapter);
  })
  .whenTargetNamed(Registry.CharacterHttpAdapter);

/**
 * List Comics By Character Use Case. Path: src\@core\application\character\list-comics-by-character.use-case.ts
 *
 * @return ListComicsByCharacterUseCase with CharacterHttpAdapter with AxiosMarvelApiHttpClient.
 */
container
  .bind<ListComicsByCharacterUseCase>(Registry.ListComicsByCharacterUseCase)
  .toDynamicValue((context) => {
    const characterHttpAdapter =
      context.container.getNamed<CharacterHttpAdapter>(
        Registry.CharacterHttpAdapter,
        Registry.AxiosHttpClient
      );

    return new ListComicsByCharacterUseCase(characterHttpAdapter);
  })
  .whenTargetNamed(Registry.CharacterHttpAdapter);
