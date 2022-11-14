type ResourceItem = {
  name: string;
  resourceURI: string;
};

type Character = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    type: "wiki" | "comiclink" | "detail";
    url: string;
  }[];
  comics: {
    collectionURI: string;
    available: number;
    returned: number;
    items: ResourceItem[];
  };
  events: {
    available: number;
    returned: number;
    items: {
      name: string;
      resourceURI: string;
    }[];
  };
  series: {
    available: number;
    returned: number;
    items: ResourceItem[];
  };
  stories: {
    available: number;
    returned: number;
    items: ResourceItem[];
  };
};

type CharactersResponse = {
  code: number;
  data: {
    total: number;
    results: Character[];
  };
};

export { Character, CharactersResponse, ResourceItem };
