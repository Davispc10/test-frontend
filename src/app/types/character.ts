import { Comic } from "./comic";
import { Thumbnail } from "./thumbnail";

export type Character = {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Comic[];
};

