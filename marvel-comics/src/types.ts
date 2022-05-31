export interface State {
  selectedCharacter: Characters;
  charactersList: Characters[];
  tempList: Characters[];
  comics: Comic;
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

export interface Comic {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: [
    {
      id?: number;
      digitalId?: number;
      title?: string;
      issueNumber?: number;
      variantDescription?: string;
      description?: string;
      modified?: string;
      isbn?: string;
      upc?: string;
      diamondCode?: string;
      ean?: string;
      issn?: string;
      format?: string;
      pageCount?: number;
      textObjects?: [
        {
          type?: string;
          language?: string;
          text?: string;
        }
      ];
      resourceURI?: string;
      urls?: [
        {
          type?: string;
          url?: string;
        }
      ];
      series?: {
        resourceURI?: string;
        name?: string;
      };
      variants?: [
        {
          resourceURI?: string;
          name?: string;
        }
      ];
      collections?: [
        {
          resourceURI?: string;
          name?: string;
        }
      ];
      collectedIssues?: [
        {
          resourceURI?: string;
          name?: string;
        }
      ];
      dates?: [
        {
          type?: string;
          date?: string;
        }
      ];
      prices?: [
        {
          type?: string;
          price?: number;
        }
      ];
      thumbnail?: {
        path?: string;
        extension?: string;
      };
      images?: [
        {
          path?: string;
          extension?: string;
        }
      ];
      creators?: {
        available?: number;
        returned?: number;
        collectionURI?: string;
        items?: [
          {
            resourceURI?: string;
            name?: string;
            role?: string;
          }
        ];
      };
      characters?: {
        available?: number;
        returned?: number;
        collectionURI?: string;
        items?: [
          {
            resourceURI?: string;
            name?: string;
            role?: string;
          }
        ];
      };
      stories?: {
        available?: number;
        returned?: number;
        collectionURI?: string;
        items?: [
          {
            resourceURI?: string;
            name?: string;
            type?: string;
          }
        ];
      };
      events?: {
        available?: number;
        returned?: number;
        collectionURI?: string;
        items?: [
          {
            resourceURI?: string;
            name?: string;
          }
        ];
      };
    }
  ];
}

export interface CharactersList {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: Characters[];
}

export interface HomeState {
  characters: Characters[];
}

export interface NotificationState {
  text: string;
  color: string;
  status?: boolean;
}
