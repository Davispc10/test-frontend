'use client'

import { createContext, useState } from "react";
import { CharacterContextProps, InitialStateProps } from "./types";

const CharacterContext = createContext<CharacterContextProps>({} as CharacterContextProps);

function CharacterProvider({ children }: { children: React.ReactNode }) {
    const initialState: InitialStateProps = { 
        characters: [],
        totalCharacters: 0,
        currentPage:  0,
        value: "",
        filteredCharacters: [],
        isSearching: false,
        loading: true,
        character: {},
        comics: []
    }

    const [state, setState] = useState<InitialStateProps>(initialState);

    return (
        <CharacterContext.Provider value={{ 
            state,
            setState

        }}>
            {children}
        </CharacterContext.Provider>
    )
}

export { CharacterProvider, CharacterContext };