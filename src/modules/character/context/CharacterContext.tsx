import { createContext, Dispatch, useContext, useState, SetStateAction, useMemo } from "react";
import { Character } from "../models/Character";

type CharacterContextType = {
    characters: Character[],
    setCharacters:  Dispatch<SetStateAction<Character[]>>
}

const CharacterContext = createContext<CharacterContextType>({
    characters: [], 
    setCharacters: () => {}
})

type CharacterProviderProps = {
    children: React.ReactNode
}

const CharacterProvider = ({ children }: CharacterProviderProps) => {
    const [characters, setCharacters] = useState<Character[]>([])

    const value = useMemo(() => ({
        characters, setCharacters
      }), [characters]);

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    )
}

const useCharacter = () => useContext(CharacterContext)

export {CharacterProvider, useCharacter}