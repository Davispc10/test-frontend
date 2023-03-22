import { Comic } from "../../domain/entities/Comic"; 
import { ComicGateway } from "../../domain/gateways/comic.gateway";

export class ListComicsUseCase {
  constructor(private heroGateway: ComicGateway) {}

  async execute(id: Number): Promise<Comic[]> {
    return await this.heroGateway.findComics(id);
  }
}