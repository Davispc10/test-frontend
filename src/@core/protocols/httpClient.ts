import { Comic } from "../domain/entities/Comic";
import { Hero } from "../domain/entities/Hero";

// PROTOCOLOS HTTP, TIPANDO OS MESMOS PARA FACILITAR O ENTENDIMENTO
export type HttpMethod = "post" | "get" | "put" | "delete";

export type HttpRequest = {
    url: string;
    method: HttpMethod;
    body?: any;
    params?: { [name: string]: string };
    headers?: { [name: string]: string };
}

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

//Tipagem da minha resposta da api
export type HttpResponse<T = (Hero[] | Comic[]) | any> = {
    statusCode: HttpStatusCode;
    data?: T;
};