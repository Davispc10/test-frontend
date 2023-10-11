import { useQuery } from "react-query"
import axios from "axios"

type ResultHeroes = {
    id: number,
    name: string,
    thumbnail: {
        path: string,
        extension: string  
    },
    comics: {
        avaiable: number
    }
}

const useMarvelHeroes = (offset : number) => {
    const md5 = "bcfc1952c287a33315457c0c7b7b380e"
    const apiKey = "1701e26487aff022e15b45fd1434f7ad"
    const timeStamp = "1"

    const { isLoading, error, data} = useQuery('heroesData', () => 
        axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&offset=${offset}`)
        .then((res) => {
            const results: Array<{id: number, name: string, thumbnail: { extension: string, path: string}}> = res.data.data.results

            return results.map((hero => {
                console.log(hero.thumbnail.path + "/portrait_incredible.jpg")
                return {
                    id: hero.id,
                    name: hero.name,
                    thumbnail: {
                        extension: hero.thumbnail.extension,
                        path: hero.thumbnail.path.includes("image_not_available") ? "https://i.pinimg.com/originals/db/b2/12/dbb2129035f83c491af200bb58e257cc.jpg" : hero.thumbnail.path + "/portrait_incredible.jpg"
                    }
                } as ResultHeroes
            }))
        })
    )
    
    return {data,error,isLoading}
}


export default useMarvelHeroes