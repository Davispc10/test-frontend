import { Comic } from "../../domain/entities/Comic";
import { ComicGateway } from "../../domain/gateways/comic.gateway";
import { HttpGateway } from "../../gateway/http";
import { HttpResponse } from "../../protocols/httpClient";

//Criação do gateway de comic, como Comic seria outra regra de outro caso de uso
//É importando isola-lo para evitar divergências com o Hero
export class ComicHttpGateway implements ComicGateway{
    constructor(private http: HttpGateway, private endpoint: string, private apiKey: string) {}
    async findComics(id: Number): Promise<Comic[]> {
        const response: HttpResponse = await this.http.request({
            method: 'get',
            url: `${this.endpoint}/characters/${id}/comics`,
            params: { 
               apikey: this.apiKey,
           }});
        return response.data.data.results;
    }

}