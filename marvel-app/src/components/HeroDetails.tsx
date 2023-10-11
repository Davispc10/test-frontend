import useHeroDetail from "@/hooks/useHeroDetail-details.hook"
import Header from "./Header"
import Image from "next/image"
import Link from "next/link"
import ComicCard from "./ComicCard"

const HeroDetails = (id : any) => {
    const {data,error,isLoading} = useHeroDetail(id)
    console.log(data?.results[0].comics.items)
    if(isLoading)
        return
    return(
        <section>
            <Header/>
            <Link href={"/"} className="h-22 w-22 bg-orange-400">{"<"}</Link>
            <div className="mr-[-41px]">
                    <Image 
                            src={`${data?.results[0].thumbnail.path}/portrait_incredible.jpg`} 
                            width={400} 
                            height={600} 
                            alt="Hero Image"/>
                </div>              
                <div className="">
                    <div className="items-center">
                        <h1 className="text-5xl">{data?.results[0].name}</h1>
                    </div>
                    <div>
                        <p className="text-xl">{data?.results[0].description}</p>
                    </div>
                </div>
                <section className="bg-slate-400 h-80 w-full inline-flex">
                {

                    data?.results[0].comics.items.map((comics, key) => (
                        <ComicCard comicName={comics.name} imgUrl={comics.resourceURI} key={key}/>
                    ))
                }
            </section>
        </section>
    )
}

export default HeroDetails