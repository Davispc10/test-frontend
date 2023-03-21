export type HeroThumbnail = {
  path: string;
  extension: string;
};

export type Hero = {
  id: number;
  name: string;
  description: string;
  thumbnail: HeroThumbnail;
};
