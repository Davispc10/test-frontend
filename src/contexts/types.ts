import { CharacterProps, Comics } from "@/types/CharacterProps";
import { Dispatch, SetStateAction } from "react";

type InitialStateProps = { 
    characters: CharacterProps[],
    character?: CharacterProps | any;
    totalCharacters: number;
    currentPage: number;
    value: string;
    filteredCharacters: any[],
    isSearching: boolean;
    loading: boolean;
    comics: Comics[]
}

interface CharacterContextProps {
    state: InitialStateProps;
    setState: Dispatch<SetStateAction<InitialStateProps | any>>
}

export type {
    InitialStateProps,
    CharacterContextProps
} 