export type CharacterComicList = {
  available: number;
  returned: number;
  collectionURI: string;
  items: { resourceURI: string; name: string }[];
};

export type CharacterUrl = {
  type: string;
  url: string;
};

export type CharacterThumbnail = {
  path: string;
  extension: string;
};

/**
 * Os atribuído usam como base a API da Marvel, para facilitar a conversão de dados.
 */
export type CharacterProps = {
  id: number;
  name: string;
  description?: string;
  modified: Date;
  resourceURI: string;
  urls: CharacterUrl[];
  thumbnail?: CharacterThumbnail;
  comics: CharacterComicList;
};

/**
 * Esta classe representa a entidade Character, onde definimos os atributos do personagem.
 * Não depende de ninguém, será usada por outros módulos.
 */
export class Character {
  constructor(public props: CharacterProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get modified() {
    return this.props.modified;
  }

  get resourceURI() {
    return this.props.resourceURI;
  }

  get urls() {
    return this.props.urls;
  }

  get thumbnail() {
    return this.props.thumbnail;
  }

  get comics() {
    return this.props.comics;
  }

  /** Irá facilitar a conversão para objeto JSON quando necessário. */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      modified: this.modified,
      resourceURI: this.resourceURI,
      urls: this.urls,
      thumbnail: this.thumbnail,
      comics: this.comics,
    };
  }
}
