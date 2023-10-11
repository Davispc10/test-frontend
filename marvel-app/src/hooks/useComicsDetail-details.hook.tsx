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

const useComicsDetail = (url : string) => {
    const md5 = "bcfc1952c287a33315457c0c7b7b380e"
    const apiKey = "1701e26487aff022e15b45fd1434f7ad"
    const timeStamp = "1"

    const link = `${url}?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`

    const { isLoading, error, data} = useQuery('comicsDetailsData', () =>        
        axios.get(link)
        .then((res) => {       
            console.log(res)
            return (res.data.data as ResultComics)
        })
    )
    console.log(data?.results[0].thumbnail.path)
    return {data,error,isLoading}
}


export default useComicsDetail