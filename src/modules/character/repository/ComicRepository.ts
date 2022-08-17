import axios from "axios"
import { UrlHelper } from "../../../utils/UrlHelper"

export class ComicRepository {

    async getComicsImageUrl (url: string) {
        const uri = `${url}?${UrlHelper.authApi}`
        const resp = await axios.get(uri)
        return resp.data
    }

}