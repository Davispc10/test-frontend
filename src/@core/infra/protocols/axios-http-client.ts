import {
  HttpRequest,
  HttpResponse,
  HttpClient,
} from "@core/data/protocols/http-client";

import axios, { AxiosResponse, AxiosInstance } from "axios";

export class AxiosHttpClient<T = any> implements HttpClient<T> {
  constructor(private instance?: AxiosInstance) {
    this.instance = instance ?? axios.create({});
  }

  async request(props: HttpRequest): Promise<HttpResponse<T>> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await this.instance.request<{ data: T }>({
        url: props.url,
        method: props.method,
        data: props.body,
        headers: props.headers,
        params: props.params,
      });
    } catch (error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    };
  }
}
