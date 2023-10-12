import { useQuery } from "react-query"
import axios from "axios"

type ResultHeroes = {
    count: number,
    limit: number,
    offset: number,
    results: [{
        id: number,
        name: string,
        thumbnail: {
            path: string,
            extension: string  
        },
        comics: {
            avaiable: number
        }
    }],
    total: number
}
const apiKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY

const useMarvelHeroes = (name?: string, offset?: number) => {

    const nameFilter = !name? "" : `&nameStartsWith=${name}`
    const offsetIndex = !offset? "" : `&offset=${offset}`
    const { isLoading, error, data} = useQuery(['heroesData', name, offset], {
        queryFn: () => 
        axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${apiKey}${nameFilter}${offsetIndex}`)
        .then((res) => {
            const results: Array<{id: number, name: string, thumbnail: { extension: string, path: string}, comics: {
                avaiable: number
            }}> = res.data.data.results

            const listData = res.data.data

            listData.results = results.map((hero => {                
                return {
                    id: hero.id,
                    name: hero.name,
                    thumbnail: {
                        path: hero.thumbnail.path.includes("image_not_available") ? "https://i.pinimg.com/originals/db/b2/12/dbb2129035f83c491af200bb58e257cc.jpg" : `${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`,
                        extension: hero.thumbnail.extension  
                    },
                    comics: {
                        avaiable: hero.comics.avaiable
                    }
                }
            }))

            return {
                count: listData.count,
                limit: listData.limit,
                offset: listData.offset,
                results: listData.results,
                total: listData.total
            } as ResultHeroes
        }),
        cacheTime: 1000 * 60 * 60 * 24 * 30 
    })
    
    return {data,error,isLoading}
}
//

export default useMarvelHeroes