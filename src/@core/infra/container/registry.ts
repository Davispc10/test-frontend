export const Registry = {
  // HttpClients
  AxiosHttpClient: Symbol.for("AxiosHttpClient"),
  AxiosMarvelApiHttpClient: Symbol.for("AxiosMarvelApiHttpClient"),

  // HttpServices
  AxiosMarvelApiHttpService: Symbol.for("AxiosMarvelApiHttpService"),

  // Character Http Adapter
  CharacterHttpAdapter: Symbol.for("CharacterHttpAdapter"),

  // Character Use Cases
  GetCharacterUseCase: Symbol.for("GetCharacterUseCase"),
  ListCharactersUseCase: Symbol.for("ListCharactersUseCase"),
};
