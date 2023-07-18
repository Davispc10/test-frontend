import { useQuery } from "react-query"
import { getHeroComics } from "../services/apiServices"
import { useRouter } from "next/router"
import { Comic } from "../utils/interfaces"

export const Comics = () => {
  const router = useRouter()
  const id = Number(router.query.id)  
  
  const { data } = useQuery({    
    queryKey: ['comics', id],
    queryFn: () => getHeroComics(id),
    refetchOnMount: 'always',
    staleTime: 0,
  })

 
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="mb-1">
        Comics
      </p>
      <div className="flex flex-row">
        {data?.length > 0 ? (
          data.slice(0,5).map((comic: Comic) => {
            return (
              <img 
                className="h-28 w-20 mr-2 rounded-sm border-2 border-slate-800"
                key={comic.id} 
                src={`${comic.thumbnail.path}.jpg`} 
              />            
            )
          })
        ) : (
          <p>
            no comics available
          </p>
        )}
      </div>
    </div>
  )
}