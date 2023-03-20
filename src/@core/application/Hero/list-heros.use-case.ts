import { Hero } from "../../domain/entities/Hero";
import { HeroGateway } from "../../domain/gateways/hero.gateway";

export type OrderBy= "name" | "modified" | "-name" | "-modified";

export interface GetHeroesListParams {
  nameContains: string;
  modifiedSince: Date;
  comics: number[];
  orderBy: OrderBy;
  limit: number;
  offset: number;
}

export class ListHeroUseCase {
  constructor(private heroGateway: HeroGateway) {}

  async execute(): Promise<Hero[]> {
    return await this.heroGateway.findAll();
  }
}