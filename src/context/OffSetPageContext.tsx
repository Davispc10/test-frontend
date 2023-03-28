import { createContext, ReactElement, useState, Dispatch, SetStateAction } from "react";

interface ContextCharacterProps {
    offsetPage: number;
    setOffsetPage: Dispatch<SetStateAction<number>>;
}

export const ContextCharacter = createContext({} as ContextCharacterProps)

interface CharacterProviderProps {
    children: ReactElement
}

export function CharacterProvider({ children }: CharacterProviderProps) {
    const [offsetPage, setOffsetPage] = useState<number>(0);
    return (
        <ContextCharacter.Provider value={{offsetPage, setOffsetPage}}>
            {children}
        </ContextCharacter.Provider>
    )
} 