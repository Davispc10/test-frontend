import axios, { AxiosInstance } from "axios";
import { HttpGateway } from "../../gateway/http";
import { HttpRequest, HttpResponse } from "../../protocols/httpClient";

//Isolando uso do axios
export class AxiosHttpGateway implements HttpGateway {
    private instance: AxiosInstance | null = null;
    constructor() {
        this.instance = axios.create({});
    }
    async request<T = any> ({ method, url, body, headers, params }: HttpRequest): Promise<HttpResponse<T>>{
        const response = await this.instance!.request({ method, url, data: body, headers, params })
        return {
            statusCode: response.status,
            data: response.data,
        }
    }

}