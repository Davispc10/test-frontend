import React from "react";

import { Character } from "@/domain/models";
import { Home } from "@/presentation/views";
import { makeRemoteLoadCharacters } from "@/main/factories/data";
import { makeRequestHandlerReactQueryAdapter } from "@/main/factories/infra";

export const makeHomeComponent = () => {
  const remoteLoadCharacters = makeRemoteLoadCharacters();
  const requestHandlerReactQueryAdapter = makeRequestHandlerReactQueryAdapter<Character[]>();
  return <Home loadCharacters={remoteLoadCharacters} requestHandler={requestHandlerReactQueryAdapter} />;
};
