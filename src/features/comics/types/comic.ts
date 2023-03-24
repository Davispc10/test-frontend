export type ComicThumbnail = {
  path: string;
  extension: string;
};

export class Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: ComicThumbnail;

  constructor(
    id: number,
    title: string,
    description: string,
    thumbnail: ComicThumbnail
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
  }
}
