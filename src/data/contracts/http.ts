export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  serverError = 500,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  data?: T;
};

export type HttpMethods = "get" | "post" | "put" | "delete";

export interface HttpClient {
  request<T = any>(url: string, method: HttpMethods, options?: Record<string, unknown>): Promise<HttpResponse<T>>;
}
