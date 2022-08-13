import { Character } from "../models/Character"

export const useSelectorGetCharacter = (characters: Character[], id: any) => {
    const numberId = parseInt(id)
    return characters.find(character => character.id === numberId)
}
export const useSelectorGetCharacterByName = (characters: Character[], name: string) => {
    if(!name.length) return []
    return characters.filter(character => 
        character.name.toLocaleLowerCase()
        .startsWith(name.toLocaleLowerCase()))
}