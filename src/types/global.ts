export interface Character {
    id: number;
    name: string;
    modified: string;
    description: string;
    resourceURI: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    comics: {
      available: number;
      collectionURI: string;
      returned: number;
    };
    events: {
      available: number;
      collectionURI: string;
      returned: number;
    };
    series: {
      available: number;
      collectionURI: string;
      returned: number;
    };
    stories: {
      available: number;
      collectionURI: string;
      returned: number;
    };
    urls: {
      type: string;
      url: string;
    }[];
  }