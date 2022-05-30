export interface State {
  selectedCharacter: Characters;
  charactersList: Characters[];
  charactersListSearched: unknown[];
  offset: number;
  limit: number;
}

export interface Characters {
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceUri: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls?: [
    {
      type: string;
      url: string;
    }
  ];
  comics?: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      }
    ];
  };
  stories?: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
        type: string;
      }
    ];
  };
  events?: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      }
    ];
  };
  series?: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      }
    ];
  };
}

export interface CharactersList {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: Characters[];
}

export interface HomeState {
  characters: CharactersList[];
}
