import { Comic } from "../../domain/entities/Comic"; 
import { HeroGateway } from "../../domain/gateways/hero.gateway";


export class ListHeroUseCase {
  constructor(private heroGateway: HeroGateway) {}

  async execute(id: Number): Promise<Comic[]> {
    return await this.heroGateway.findComics(id);
  }
}