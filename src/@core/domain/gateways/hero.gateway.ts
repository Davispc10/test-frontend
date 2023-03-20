import { Hero } from "../entities/Hero";

export interface HeroGateway {
    findAll(): Promise<Hero[]>;
    findById(id: Number): Promise<Hero>;
}