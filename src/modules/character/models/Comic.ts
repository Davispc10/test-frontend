export class Comic {
    
    constructor (readonly name: string, readonly url: string, private _urlImage?: string) {}
    
    static toDomain(data: any) { 
        return new Comic(data.name, data.resourceURI) 
    }

    static toDomainWithImage(comic: Comic, data: any) {
        const imageUrl = data.thumbnail.path + '.' + data.thumbnail.extension
        return new Comic(comic.name, comic.url, imageUrl)
    }

    public isValid() {
        if(this._urlImage !== undefined && this._urlImage.includes('image_not_available')) {
                return false
        }
        return true
    }

    get urlImage(): string | undefined{
        return this._urlImage
    }
}