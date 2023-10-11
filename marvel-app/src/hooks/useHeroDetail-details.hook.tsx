import { useQuery } from "react-query"
import axios from "axios"

type ResultHeroes = {
    results : [{
        id: string,
        name: string,
        description: string
        thumbnail: {
            path: string,
            extension: string
        },
        comics : {
            avaiable: number,
            items: [{
                resourceURI: string,
                name: string
            }]
        }
    }]
}

const useHeroDetail = (id : number) => {
    const md5 = "bcfc1952c287a33315457c0c7b7b380e"
    const apiKey = "1701e26487aff022e15b45fd1434f7ad"
    const timeStamp = "1"

    const teste = "http://gateway.marvel.com/v1/public/characters/1009146?ts=1&apikey=1701e26487aff022e15b45fd1434f7ad&hash=bcfc1952c287a33315457c0c7b7b380e"

    const link = `http://gateway.marvel.com/v1/public/characters/${id}?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`

    const { isLoading, error, data} = useQuery('heroDetailsData', () =>        
        axios.get(teste)
        .then((res) => {        
            const results = res.data.data as ResultHeroes
            !results.results[0].description ? results.results[0].description = "Descrição não informada" : null
            return (results)
        })
    )
    return {data ,error,isLoading}
}


export default useHeroDetail