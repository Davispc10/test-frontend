'use client'
import { useCallback, useContext, useEffect } from "react";
import { CharacterContext } from "@/contexts/CharacterProvider";
import { CharacterController } from "@/api/services/controller";
import { InitialStateProps } from "@/contexts/types";
import { getStateFromLocalStorage, saveStateToLocalStorage } from "@/utils/Storage";
import { CharacterProps } from "@/types/CharacterProps";

import Image from "next/image";
import { Content } from "@/components/organisms";

export default function Home() {
  const { state, setState } = useContext(CharacterContext);

  const characterController = new CharacterController();

  const getResults = useCallback(async (page: number) => {
    setState((prevState: InitialStateProps) => ({
      ...prevState,
      isSearching: true,
    }));
    await characterController.getAllCharacter({ page }).then(({ data }) => {
      setState((prevState: InitialStateProps) => ({
        ...prevState,
        characters: data.results,
        totalCharacters: data.total,
        isSearching: false,
        loading:false
      }));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setState]);

  useEffect(() => {
    const storedFilterValue = getStateFromLocalStorage("filterValue");
    if (storedFilterValue) {
      setState((prevState: InitialStateProps) => ({
        ...prevState,
        value: storedFilterValue,
        loading:false
      }));
      characterSearch(storedFilterValue);
    } else {
      getResults(state.currentPage);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPage, getResults, setState]);

  useEffect(() => {
    saveStateToLocalStorage("filterValue", state.value);
  }, [state.value]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setState((prevState: InitialStateProps) => ({
      ...prevState,
      value: inputValue,
      loading:false
    }));
    characterSearch(inputValue);
  };

  const characterSearch = async (name: string) => {
    if (!name || name === "") {
      getResults(state.currentPage);
      setState((prevState: InitialStateProps) => ({
        ...prevState,
        value: null,
        loading:false
      }));
    } else {
      await characterController.findByName({ name }).then(({ data }) => {
        if (data.results.length > 0) {
          setState((prevState: InitialStateProps) => ({
            ...prevState,
            filteredCharacters: data.results,
            totalCharacters: data.total,
            loading:false
          }));
        } else {
          const regex = new RegExp(name, "i");
          const filteredCharacters = state.characters.filter((character: CharacterProps) =>
            regex.test(character.name)
          );
          setState((prevState: InitialStateProps) => ({
            ...prevState,
            filteredCharacters,
            totalCharacters: filteredCharacters.length,
            loading:true
          }));
        }
      });
    }
  };

  const renderImage = (character: CharacterProps) => {
    const path = character.thumbnail.path;
    const extension = character.thumbnail.extension;
    const imageNotAvailable = path.includes('image_not_available');
    if(imageNotAvailable) {
      return <Image src="/marvel-logotipo.jpg" alt="Logotipo Marvel" width={170} height={100} className="rounded-lg rounded-bl-none rounded-br-none w-full md:min-h-[272.25px] md:max-h-[272.25px] lg:min-h-[255px] lg:max-h-[255px] lg:min-w-full"/>
    } else {
      return <Image className="rounded-lg rounded-bl-none rounded-br-none w-full md:min-h-[272.25px] md:max-h-[272.25px] lg:min-h-[255px] lg:max-h-[170.67px] lg:min-w-full" src={path + '/portrait_fantastic.' + extension} alt={character.name} width={170} height={255} />
    }
  }

  const displayedCharacters = state.value ? state.filteredCharacters : state.characters;

  return (
    <Content 
      displayedCharacters={displayedCharacters}
      onChange={handleInputChange}
      renderImage={renderImage}
      state={state}
      setPage={(selectedPage) => {
        setState((prevState: InitialStateProps) => ({
          ...prevState,
          currentPage: selectedPage.selected,
        }));
      }}
    />
  );
}