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

const apiKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY

const useHeroDetail = (id : number) => {

    const link = `http://gateway.marvel.com/v1/public/characters/${id}?apikey=${apiKey}`

    const { isLoading, error, data} = useQuery(['heroDetailsData', id], () =>        
        axios.get(link)
        .then((res) => {        
            const results = res.data.data as ResultHeroes         
            !results.results[0].description ? results.results[0].description = "Descrição não informada" : null
            results.results[0].thumbnail.path.includes("image_not_available") ? "https://i.pinimg.com/originals/db/b2/12/dbb2129035f83c491af200bb58e257cc.jpg" : `${results.results[0].thumbnail.path}/portrait_incredible.${results.results[0].thumbnail.extension}`
            return (results)
        })
    )
    return {data ,error,isLoading}
}


export default useHeroDetail