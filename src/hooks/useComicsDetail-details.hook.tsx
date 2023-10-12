import { useQuery } from "react-query"
import axios from "axios"

type ResultComics = {
    results : [{
        thumbnail: {
            path: string,
            extension: string
        }
    }]
}

const apiKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY

const useComicsDetail = (url : string) => {
    const link = `${url}?apikey=${apiKey}`
    
    const { isLoading, error, data} = useQuery([
        'comicsDetailData',
        url
    ],{
        queryFn:  () =>        
        axios.get(link)
        .then((res) => {       
            console.log('res', res)
            return (res.data.data as any)
        }),
    })
    return {data,error,isLoading}
}


export default useComicsDetail