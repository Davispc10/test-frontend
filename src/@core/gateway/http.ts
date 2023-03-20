//Tipando a request Http
import { HttpRequest, HttpResponse } from "../protocols/httpClient";

//Essa Interface ajuda a evitar erros de tipo e torna o código mais seguro e robusto.
export interface HttpGateway<R = any> {
    request: (props: HttpRequest) => Promise<HttpResponse<R>>
}