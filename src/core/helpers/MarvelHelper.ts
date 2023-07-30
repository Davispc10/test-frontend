import crypto from "crypto";

class MarvelHelper {
  genCredentials(): MarvelCredentials {
    const privateKey = process.env.MARVEL_PRIVATE_KEY!;
    const publicKey = process.env.MARVEL_PUBLIC_KEY!;

    // const ts = Date.now().toString();
    const ts = "0";
    const hash = crypto
      .createHash("md5")
      .update(ts + privateKey + publicKey)
      .digest("hex");

    return { publicKey, ts, hash };
  }

  async getCharacterById(
    id: number
  ): Promise<MarvelApiResponse<MarvelCharacter>> {
    const { publicKey, ts, hash } = this.genCredentials();

    let url = `https://gateway.marvel.com/v1/public/characters/${id}`;
    url = url + `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
    const data = await res.json();

    data.data.results.forEach((character: MarvelCharacter) => {

      if (!character.thumbnail || !character.thumbnail.path || !character.thumbnail.extension) {
        character.thumbnail = {
          path: "https://imgur.com/a/2aFy5fn.png", 
          extension: "png",
        };
      }

      if (!character.description) {
        character.description = "Descrição não informada";
      }
    });

    return { ...data };
  }

  async getListOfCharacters({
    limit,
    offset,
    characterName,
  }: {
    limit: number;
    offset: number;
    characterName?: string;
  }): Promise<MarvelApiResponse<MarvelCharacter>> {
    const { publicKey, ts, hash } = this.genCredentials();

    let url = "https://gateway.marvel.com/v1/public/characters";
    url =
      url +
      `?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

    if (characterName) {
      url = url + `&nameStartsWith=%${characterName}`;
    }

    const res = await fetch(url, { method: "GET" });
    const data = await res.json();

    data.data.results.forEach((character: MarvelCharacter) => {
      if (!character.thumbnail || !character.thumbnail.path || !character.thumbnail.extension) {
        character.thumbnail = {
          path: "https://imgur.com/a/2aFy5fn.png", 
          extension: "png", 
        };
      }

      if (!character.description) {
        character.description = "Descrição não informada";
      }
    });

    return { ...data };
  }

  async getEventOfCharacterById(
    id: number
  ): Promise<MarvelApiResponse<MarvelEventData>> {
    const { publicKey, ts, hash } = this.genCredentials();

    let url = `https://gateway.marvel.com/v1/public/characters/${id}/events`;
    url = url + `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
    const data = await res.json();
    return { ...data };
  }

  async getComicsOfCharacterById(
    id: number
  ): Promise<MarvelApiResponse<MarvelEventData>> {
    const { publicKey, ts, hash } = this.genCredentials();

    let url = `https://gateway.marvel.com/v1/public/characters/${id}/comics`;
    url = url + `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
    const data = await res.json();
    return { ...data };
  }

  async getSeriesOfCharacterById(
    id: number
  ): Promise<MarvelApiResponse<MarvelSeries>> {
    const { publicKey, ts, hash } = this.genCredentials();

    let url = `https://gateway.marvel.com/v1/public/characters/${id}/series`;
    url = url + `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
    const data = await res.json();
    console.log("url -> ", url);
    console.log("data -> ", data);
    return { ...data };
  }

  async getStoriesOfCharacterById(
    id: number
  ): Promise<MarvelApiResponse<MarvelStories>> {
    const { publicKey, ts, hash } = this.genCredentials();

    let url = `https://gateway.marvel.com/v1/public/characters/${id}/stories`;
    url = url + `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
    const data = await res.json();
    console.log("url -> ", url);
    console.log("data -> ", data);
    return { ...data };
  }
}

export default MarvelHelper;
