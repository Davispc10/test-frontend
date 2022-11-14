import { HttpClient, HttpMethods, HttpResponse } from "@/data/contracts";
import { backendCharacterMock } from "./character";

export class HttpClientSpy implements HttpClient {
  data: any = {
    data: {
      results: [backendCharacterMock()],
    },
  };

  request<T = any>(url: string, method: HttpMethods, options?: Record<string, unknown>): Promise<HttpResponse<T>> {
    return Promise.resolve({
      statusCode: 200,
      data: this.data
    });
  }
}
