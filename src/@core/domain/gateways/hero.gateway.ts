import { Comic } from "../entities/Comic";
import { Hero } from "../entities/Hero";

export interface HeroGateway {
    findAll(): Promise<Hero[]>;
    findById(id: Number): Promise<Hero>;
    findComics(id: Number): Promise<Comic[]>;
}