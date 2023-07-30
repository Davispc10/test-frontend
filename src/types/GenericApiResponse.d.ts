export interface GenericApiResponse<T>{
  code: number;
  status: string;
  copywrite: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
  };
}

export interface Collection{
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
  returned: number;
}
