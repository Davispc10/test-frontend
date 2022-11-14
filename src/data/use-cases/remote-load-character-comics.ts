import { Comic } from "@/domain/models";
import { LoadCharactersComics, LoadCharactersComicsResult } from "@/domain/features";
import { HttpClient } from "@/data/contracts";

export class RemoteLoadCharacterComics implements LoadCharactersComics {
  constructor(private readonly httpClient: HttpClient) {}

  async loadAll(id: number, page: number = 1, limit: number = 12): Promise<LoadCharactersComicsResult> {
    const result = await this.httpClient.request(`/characters/${id}/comics`, "get", {
      params: {
        offset: (page - 1) * limit,
        limit,
      },
    });
    return {
      comics: this.mapDataToModel(result.data),
      totalComics: result.data.data.total,
    };
  }

  private mapDataToModel(data: Record<any, any>): Comic[] {
    return data.data.results.map((comic) => ({
      id: comic.id,
      title: comic.title,
      description: comic.description || "description not informed",
      thumbnail: comic.thumbnail.path.includes("image_not_available")
        ? "https://midias.correiobraziliense.com.br/_midias/jpg/2021/05/03/675x450/1_marvel_studios_logo-6637962.jpeg?20220621151438?20220621151438"
        : `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    }));
  }
}
