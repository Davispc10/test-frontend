import React from "react";

import { CharacterDetails } from "@/presentation/views";
import { makeLoadCharactersComics } from "@/main/factories/data";
import { makeRequestHandlerReactQueryAdapter } from "@/main/factories/infra";
import { LoadCharactersComicsResult } from "@/domain/features";

export const makeCharacterDetailsComponent = () => {
  const requestHandlerReactQueryAdapter = makeRequestHandlerReactQueryAdapter<LoadCharactersComicsResult>();
  return <CharacterDetails loadCharactersComics={makeLoadCharactersComics()} requestHandler={requestHandlerReactQueryAdapter} />;
};
