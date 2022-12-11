export type HttpMethod = "post" | "get" | "put" | "delete";

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  params?: { [name: string]: string };
  headers?: { [name: string]: string };
};

export interface HttpClient<R = any> {
  request: (props: HttpRequest) => Promise<HttpResponse<R>>;
}

/**
 * HTTP status codes
 * @see https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
 *
 * Esses status são os mais comuns e não
 * será necessário mais do que isso para esta aplicação.
 */
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  data?: T;
};
