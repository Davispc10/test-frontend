import { CharacterRepositoryProps, CharacterControllerProps} from "../interfaces/CharacterInterface";
import CharacterRepository from "../repositories/CharacterRepository";

export default class CharacterController implements CharacterControllerProps {
    all: any;
    find: any;
    findByOne: any;
    findComicById: any;
    public characterRepository = new CharacterRepository();

    async getAllCharacter({page}: CharacterRepositoryProps) {
        return await this.characterRepository.all({page})
    }
    async findByName({name}: {name: string}) {
        return await this.characterRepository.find({name})
    }
    async findById({id}: {id: string}) {
        return await this.characterRepository.findByOne({id})
    }
    async findComic({id}: {id: number}) {
        return await this.characterRepository.findComicById({id})
    }
}