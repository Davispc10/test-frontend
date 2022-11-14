import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { HttpResponse, HttpClient, HttpMethods } from "@/data/contracts";

export class HttpClientAxiosAdapter implements HttpClient {
  private httpClient: AxiosInstance;
  constructor () {
    this.httpClient = axios.create({
      baseURL: "https://gateway.marvel.com:443/v1/public",
      params: {
        apikey: process.env.VITE_APP_MARVEL_PUBLIC_KEY,
        hash: process.env.VITE_APP_MARVEL_MD5_HASH
      }
    });
  }

  async request<T = any>(url: string, method: HttpMethods, options?: AxiosRequestConfig): Promise<HttpResponse> {
    const result = await this.httpClient.request<T>({
      url,
      method,
      ...options,
    });

    return {
      statusCode: result.status,
      data: result.data,
    };
  }
}