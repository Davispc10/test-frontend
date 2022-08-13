import axios from "axios"
import { UrlHelper } from "../../../utils/UrlHelper"
import { Comic } from "../models/Comic"

export class ComicRepository {

    async getComicsImageUrl (comics: Comic[]) {
        const newComics: Comic[] = []
        
        try {
            for(const comic of comics) {
                const uri = `${comic.url}?${UrlHelper.authApi}`
                const resp = await axios.get(uri)
                const data = resp.data.data.results[0]
                const imageUrl = data.thumbnail.path + '.' + data.thumbnail.extension
                const newComic = new Comic(comic.name, comic.url, imageUrl)
                if(newComic.isValid()) {
                    newComics.push(newComic)
                }
            }
            return newComics
        }catch(e) {
            console.log(e)
            return []
        }
    }

}