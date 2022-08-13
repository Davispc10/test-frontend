import { Comic } from "./Comic"

/* Nesse caso optei por validadar a descricão e imagem aqui mesmo. Claro que a medida 
* que tivesse mais validações ficaria inviável fazer dessa forma, eu optaria por 
* uma lib ou um design pattern */

export class Character {
    //@ts-ignore
    #marveLogo: string = process.env.marvelLogo
    
    constructor(
        readonly id: number,
        readonly name: string,
        private _description: string,
        private _urlImage: string,
        readonly comics: Comic[],
    ) {
        this.validateDescription(); 
        this.validateImage()
    }

    static toDomain (data: any) {
        const urlImage = data.thumbnail.path + "." + data.thumbnail.extension
        const comics: Comic[] = []

        const length = data.comics.items.length > 5 ? 5 : data.comics.items 
        
        for (let i = 0; i < length; i++) {
            const comicData = data.comics.items[i]
            const comic = Comic.toDomain(comicData)
            comics.push(comic)
        }
       
        return new Character(data.id, data.name, data.description, urlImage, comics)
    }

    public hasComics = () => {
        return this.comics.length
    }

    
    private validateDescription() {
        if(this._description.length === 0) {
            this._description = 'description not informed';
        } 
    }

    private validateImage() {
        if(this._urlImage.includes('image_not_available')) {
            this._urlImage = this.#marveLogo
        }
    }

    get description(): string {
        return this._description
    }
    get urlImage(): string {
        return this._urlImage
    }
}