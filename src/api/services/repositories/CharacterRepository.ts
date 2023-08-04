import axios from "axios";
import md5 from 'md5'
import { CharacterRepositoryProps } from "../interfaces/CharacterInterface";

export default class CharacterRepository {
    public baseURL = "https://gateway.marvel.com:443/v1/public/characters?apikey=";
    public pageSize: any = process.env.NEXT_PUBLIC_PAGE_SIZE;
    public privateKey: any = process.env.NEXT_PUBLIC_API_PRIVATE_KEY;
    public publicKey: any = process.env.NEXT_PUBLIC_API_PUBLIC_KEY;
    public ts = new Date().getTime();
    public stringToHash =  md5(this.ts+this.privateKey+this.publicKey);

    async all({page}: CharacterRepositoryProps) {
       const URI = this.baseURL + this.publicKey + "&ts=" + this.ts + "&hash=" + this.stringToHash

       try {
        return await axios.get(URI, {
            params: {
                offset: page * this.pageSize,
                limit: this.pageSize
            }
        }).then((response) => response.data);
       } catch (error) {
            console.error('Erro ao buscar personagens:', error);
       }
    }

    async find({name}: {name: string}) {
        const URI = this.baseURL + this.publicKey + "&ts=" + this.ts + "&name=" + name + "&hash=" + this.stringToHash

        try {
         return await axios.get(URI, {
             params: {
                 limit: 1
             }
         }).then((response) => response.data);
        } catch (error) {
             console.error('Erro ao buscar personagens:', error);
        }
    }
    async findByOne({id}: {id: string}) {
        const URI = `https://gateway.marvel.com:443/v1/public/characters/${id}` + "?apikey=" + this.publicKey + "&ts=" + this.ts + "&hash=" + this.stringToHash

        try {
         return await axios.get(URI, {
             params: {
                 limit: 1
             }
         }).then((response) => response.data);
        } catch (error) {
             console.error('Erro ao buscar personagens:', error);
        }
    }
    async findByURI({id}: {id: number}) {
        const URI = `https://gateway.marvel.com:443/v1/public/comics/${id}` + "?apikey=" + this.publicKey + "&ts=" + this.ts + "&hash=" + this.stringToHash

        try {
         return await axios.get(URI).then((response) => response.data);
        } catch (error) {
             console.error('Erro ao buscar personagens:', error);
        }
    }
}