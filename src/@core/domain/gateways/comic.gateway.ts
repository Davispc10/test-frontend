import { Comic } from "../entities/Comic";

//Gateway criado apenas para os quadrinhos
export interface ComicGateway {
    findComics(id: Number): Promise<Comic[]>;
}