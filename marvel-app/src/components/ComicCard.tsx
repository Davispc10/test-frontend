import useComicsDetail from "@/hooks/useComicsDetail-details.hook"
import Image from "next/image"

type ComicProps = {
    comicName: string,
    imgUrl: string
}

const ComicCard = ({comicName, imgUrl} : ComicProps) => {
    const {data, isLoading, error} = useComicsDetail(imgUrl)
    console.log(imgUrl)
    if(isLoading) return;

    return(
        <div className="max-w-[100%] max-h-[100%] bg-orange-400">
            <div className="h-[300px] w-[250px] ">
                <Image 
                    src={`${data?.results[0].thumbnail.path}/portrait_incredible.jpg`} 
                    width={400} 
                    height={600} 
                    alt="Hero Image"/>             
            </div>
            <p>
                {comicName}
            </p>
        </div>
    )
}

export default ComicCard