import { OrderBy } from "../../application/Hero/listHeros.useCase";
import { Comic } from "../../domain/entities/Comic";
import { Hero } from "../../domain/entities/Hero";
import { HeroGateway } from "../../domain/gateways/hero.gateway";
import { HttpGateway } from "../../gateway/http";
import { HttpResponse } from "../../protocols/httpClient";

//Criação do gateway de Hero, onde estou fazendo o request para a api com os 
//meus paramtros e esperando o retorno
export class HeroHttpGateway implements HeroGateway{
    constructor(private http: HttpGateway, private endpoint: string, private apiKey: string, private limit: number, private orderBy: OrderBy, private offset: number) {}
    async findAll(): Promise<Hero[]> {
         const response: HttpResponse = await this.http.request({
             method: 'get',
             url: `${this.endpoint}/characters`,
             params: { 
                apikey: this.apiKey,
                limit: String(this.limit),
                orderBy: this.orderBy,
                offset: String(this.offset),
            }});
         return response.data.data.results;
    }
    async findById(id: Number): Promise<Hero> {
        const response: HttpResponse = await this.http.request({
            method: 'get',
            url: `${this.endpoint}/characters/${id}`,
            params: { 
               apikey: this.apiKey,
               orderBy: this.orderBy,
           }});
        return response.data.data.results[0];
    }

    async findComics(id: Number): Promise<Comic[]> {
        const response: HttpResponse = await this.http.request({
            method: 'get',
            url: `${this.endpoint}/characters/${id}/comics`,
            params: { 
               apikey: this.apiKey,
               orderBy: this.orderBy,
           }});
        return response.data.data.results;
    }

}