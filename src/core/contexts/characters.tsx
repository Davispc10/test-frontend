"use client"

import { createContext, ReactNode, useEffect, useState } from "react";

import MarvelHelper from '@/helpers/MarvelHelper'

type CharactersContextType = {
  charactersResponse: MarvelCharacter[] | null;
  charactersLoading: boolean,
  charactersLoadingFail: boolean,
  page: number,
  setPage: (page: number) => void,
  characterName?: string,
  setCharacterName: (name: string | undefined) => void,
  setResponseData: (array: MarvelCharacter[]) => void,
  getData: (firstSearch?: boolean) => void,
  finishResults: boolean,
  fail: boolean
};

const CharactersContext = createContext({} as CharactersContextType);

type Props = {
  children: ReactNode;
}

function CharactersProvider({ children }: Props) {

  const marvelHelper = new MarvelHelper()

  const [responseData, setResponseData] = useState<Array<MarvelCharacter>>([])
  const [load, setLoad] = useState<boolean>(false)
  const [fail, setFail] = useState<boolean>(false)
  const [finishResults, setFinishResults] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [characterName, setCharacterName] = useState<string | undefined>(undefined)

  async function getData(firstSearch?: boolean) {
    setLoad(true)
    setFinishResults(false)
    setFail(false)

    if (firstSearch) {
      setPage(0)
      setResponseData([])
    }

    const limit = 10
    const offset = limit * page

    let result: MarvelApiResponse<MarvelCharacter>
    let results: Array<MarvelCharacter>

    if (characterName) {
      result = await marvelHelper.getListOfCharacters({ limit, offset, characterName })
    } else {
      result = await marvelHelper.getListOfCharacters({ limit, offset })
    }

    if (result.code != 200) {
      setFail(true)
    }

    results = result.data.results

    if (results.length < limit) {
      setFinishResults(true)
    }

    if (firstSearch) {
      setResponseData([...results])
    } else {
      setResponseData([...responseData, ...results])
    }

    setLoad(false)
  }

  return (
    <CharactersContext.Provider
      value={{
        charactersLoading: load,
        charactersLoadingFail: fail,
        charactersResponse: responseData,
        page,
        setPage,
        characterName,
        setCharacterName,
        setResponseData,
        getData,
        finishResults,
        fail
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export { CharactersContext, CharactersProvider };
