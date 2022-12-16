export type ComicThumbnail = {
  path: string;
  extension: string;
};

export type ComicProps = {
  id: number;
  title: string;
  description: string | null;
  modified: Date;
  thumbnail: ComicThumbnail;
};

/**
 * Esta classe representa a entidade Comic, onde definimos os atributos de uma comic.
 * Não depende de ninguém, será usada por outros módulos.
 */
export class Comic {
  constructor(public props: ComicProps) {
    // Caso a thumbnail possua image_not_available em seu caminho, a thumbnail será removida e substituída pela imagem da marvel.
    if (props.thumbnail?.path.includes("image_not_available")) {
      props.thumbnail = {
        path: "/images/marvel-image-comic",
        extension: "jpg",
      };
    }

    // Caso não venha escrição, substituir pela informada abaixo.
    if (!props.description) {
      props.description = "*Description not informed*";
    }
  }

  get id(): number {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get modified(): Date {
    return this.props.modified;
  }

  get thumbnail(): ComicThumbnail {
    return this.props.thumbnail;
  }

  /** Irá facilitar a conversão para objeto JSON quando necessário. */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      modified: this.modified,
      thumbnail: this.thumbnail,
    };
  }
}

type ToJSONFn = typeof Comic.prototype.toJSON;
export type ComicJSON = ReturnType<ToJSONFn>;
