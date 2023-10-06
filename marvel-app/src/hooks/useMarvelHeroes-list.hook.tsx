import { useQuery } from "react-query"
import axios from "axios"

type ResultHeroes = {
    name: string,
    thumbnail: string
}

const useMarvelHeroes = () => {
    const md5 = "bcfc1952c287a33315457c0c7b7b380e"
    const apiKey = "1701e26487aff022e15b45fd1434f7ad"
    const timeStamp = "1"

    const { isLoading, error, data} = useQuery('heroesData', () => 
        axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`)
        .then((res) => {
            const results: Array<{name: string, thumbnail: string}> = res.data.data.results
            
            return results.map((hero => {
                return {
                    name: hero.name,
                    thumbnail: hero.thumbnail
                } as ResultHeroes
            }))
        })
    )
    console.log(data)
    return {data,error,isLoading}
}


export default useMarvelHeroes