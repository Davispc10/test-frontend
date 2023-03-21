export type ComicThumbnail = {
  path: string;
  extension: string;
};

export type Comic = {
  id: number;
  title: string;
  description: string;
  thumbnail: ComicThumbnail;
};
