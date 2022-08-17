import { createContext, Dispatch, useContext, useState, SetStateAction, useMemo } from "react";

type CharacterContextType = {
    searchedName: string,
    setSearchedName:  Dispatch<SetStateAction<string>>
}

const CharacterContext = createContext<CharacterContextType>({
    searchedName: '',
    setSearchedName: () => {}
})

type CharacterProviderProps = {
    children: React.ReactNode
}

const CharacterProvider = ({ children }: CharacterProviderProps) => {
    const [searchedName, setSearchedName] = useState('')

    const value = useMemo(() => ({
        searchedName,
        setSearchedName,
      }), [searchedName]);

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    )
}

const useCharacter = () => useContext(CharacterContext)

export {CharacterProvider, useCharacter}