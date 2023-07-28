export interface Comic {
  thumbnail: string;
  title: string;
  id: number;
}

export interface Character {
  id: number;
  name: string;
  description?: string;
  thumbnail: string;
  comics: Comic[];
}

export interface CharacterPreview
  extends Pick<Character, "name" | "thumbnail" | "id"> {}
