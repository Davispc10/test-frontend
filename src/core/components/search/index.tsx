"use client"

import { useState, ChangeEvent, useContext, FormEvent } from 'react';
import { CharactersContext } from "@/contexts/characters";


import { Search, SearchInputContainer, SearchButtonContainer } from './styles';
import Navigator from '@/utils/navigator';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useEffect } from 'react';

interface ISearch {
  openSearch: boolean
}

export default function SearchCompoment({ openSearch }: ISearch) {
  const { getData, setCharacterName, characterName } = useContext(CharactersContext);

  const [changeName, setChangeName] = useState<string | undefined>(undefined)

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const named = e.target.value
    setChangeName(named ? named : undefined);
  };


  function getSearch(event?: FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
    }
    setCharacterName(changeName)
  }

  useEffect(() => {
    getData(true);
  }, [characterName])


  return <Search >
    <form onSubmit={getSearch}>
      <div className={`${openSearch ? "active" : "inactive"}`}>
        <SearchInputContainer>
          <input type="text" value={changeName} onChange={handleNameChange} />
        </SearchInputContainer>
        <SearchButtonContainer>
          <Navigator title='Pesquisar' type='submit' style='general-icon' action={() => {
            getSearch()
          }}>
            <AiOutlineArrowRight />
          </ Navigator>
        </SearchButtonContainer>
      </div>
    </form>
  </Search>;
}
