import axios from "axios"
import { UrlHelper } from "../../../utils/UrlHelper"

export const LIMIT = 10

export class CharacterRepository {
    #route = `characters`
 
    getByOffset = async (offset: number) => {
        const url = `${UrlHelper.urlBase}${this.#route}?limit=${LIMIT}&offset=${offset}&${UrlHelper.authApi}`
        const respo = await axios.get(url)
        return respo.data
    }
    
    getByNameStartWith = async (offset: number, name: string) => {
        const url = `${UrlHelper.urlBase}${this.#route}?nameStartsWith=${name}&limit=${LIMIT}&offset=${offset}&${UrlHelper.authApi}`
        const respo = await axios.get(url)
        return respo.data
    }
}