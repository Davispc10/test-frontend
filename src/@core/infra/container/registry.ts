export const Registry = {
  // HttpClients
  AxiosHttpClient: Symbol.for("AxiosHttpClient"),
  AxiosMarvelApiHttpClient: Symbol.for("AxiosMarvelApiHttpClient"),

  // HttpServices
  AxiosMarvelApiHttpService: Symbol.for("AxiosMarvelApiHttpService"),

  // Character Http Adapter
  CharacterHttpAdapter: Symbol.for("CharacterHttpAdapter"),

  // Comic Http Adapter
  ComicHttpAdapter: Symbol.for("ComicHttpAdapter"),

  // Character Use Cases
  GetCharacterUseCase: Symbol.for("GetCharacterUseCase"),
  ListCharactersUseCase: Symbol.for("ListCharactersUseCase"),
  ListAllCharactersUseCase: Symbol.for("ListAllCharactersUseCase"),
  ListComicsByCharacterUseCase: Symbol.for("ListComicsByCharacterUseCase"),
};
