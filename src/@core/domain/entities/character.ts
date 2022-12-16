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
  thumbnail?: CharacterThumbnail;
};

/**
 * Esta classe representa a entidade Character, onde definimos os atributos do personagem.
 * Não depende de ninguém, será usada por outros módulos.
 */
export class Character {
  constructor(public props: CharacterProps) {
    // Caso a thumbnail possua image_not_available em seu caminho, a thumbnail será removida e substituída pela imagem da marvel.
    if (props.thumbnail?.path.includes("image_not_available")) {
      props.thumbnail = {
        path: "/images/marvel-image",
        extension: "jpg",
      };
    }

    // Caso não venha escrição, substituir pela informada abaixo.
    if (!props.description) {
      props.description = "*Description not informed*";
    }
  }

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

  get thumbnail() {
    return this.props.thumbnail;
  }

  /** Irá facilitar a conversão para objeto JSON quando necessário. */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      modified: this.modified,
      thumbnail: this.thumbnail,
    };
  }
}

type ToJSONFn = typeof Character.prototype.toJSON;
export type CharacterJSON = ReturnType<ToJSONFn>;
