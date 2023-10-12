import { useQuery } from "react-query"
import axios from "axios"

type ResultHeroes = {
    results: [{
        title: string,
        thumbnail: {
            path: string,
            extension: string  
        },
    }],
}
const apiKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY

const useComicsByHero = (heroId : number) => {

    const { isLoading, error, data} = useQuery(['heroComicsData'], {
        queryFn: () => 
        axios.get(`http://gateway.marvel.com/v1/public/characters/${heroId}/comics?apikey=${apiKey}`)
        .then((res) => {
            console.log(res)
            return res.data.data as ResultHeroes
        }),
        cacheTime: 1000 * 60 * 60 * 24 * 30 
    })
    
    return {data,error,isLoading}
}

export default useComicsByHero