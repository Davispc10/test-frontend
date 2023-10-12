import Image from "next/image"
import DefaultImage from "@/assets/marvel-logo.jpg"

type ComicProps = {
    title : string,
    imgUrl : string,
    extension: string
}

const ComicCard = ({title, imgUrl, extension} : ComicProps) => {
    return(
        <div className="max-w-[100%] max-h-[100%] bg-orange-400">
            <div className="h-[300px] w-[250px] ">
                <Image 
                    src={`${imgUrl}/portrait_incredible.${extension}`} 
                    width={400} 
                    height={600} 
                    alt="Hero Image"
                    />             
            </div>
            <div className="sticky bottom-0 bg-black/70 items-center">
                <p className="text-white text-2xl px-4 font-bold w-full">
                    {title}
                </p>
            </div>         
        </div>
    )
}

export default ComicCard