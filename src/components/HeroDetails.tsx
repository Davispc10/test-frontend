import useHeroDetail from "@/hooks/useHeroDetail-details.hook"
import Header from "./Header"
import Image from "next/image"
import Link from "next/link"
import ComicCard from "./ComicCard"
import ArrowButton from "@/assets/ArowButton.png"
import useComicsByHero from "@/hooks/useComicsByHero-details.hook"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const HeroDetails = ({id} : {id: number}) => {
    const {data,error,isLoading} = useHeroDetail(id)
    const comicsData = useComicsByHero(id);

    const slides = comicsData.data?.results
    const [curr, setCurr] = useState(0)
     

    if(isLoading || comicsData.isLoading)
        return
    const slidesLenght = (slides?.length? slides?.length : 0)
    const prev = () => setCurr((curr) => (curr === 0 ? slidesLenght - 5 : curr - 1))
    const next = () => setCurr((curr) => (curr === slidesLenght -5 ? 0 : curr + 1))

    console.log(curr)
    return(
        <section className="bg-details-pattern bg-no-repeat bg-center bg-cover">
            <Header/>
            <Link href={"/"} className="absolute flex justify-center rounded-full left-4 h-[50px] w-[50px] items-center align-middle bg-orange-400">
                <Image src={ArrowButton} width={30} height={30} alt="arrow button"/>
            </Link>
            <div className="p-6 w-full flex items-center">
                <div>
                <Image 
                    className=""
                    src={`${data?.results[0].thumbnail.path}/portrait_incredible.${data?.results[0].thumbnail.extension}`} 
                    width={400} 
                    height={600} 
                    alt="Hero Image"/>
                </div>              
                <div className="px-8">
                    <div className="items-center">
                        <h1 className="text-5xl text-white font-bold">{data?.results[0].name}</h1>
                    </div>
                    <div className="py-5">
                        <p className="text-xl text-white">{data?.results[0].description}</p>
                    </div>
                </div>
            </div>
                <section className="bg-slate-400 h-80 w-full overflow-hidden relative inline-flex">
                    <div className="flex row-auto transition-transform ease-out duration-500" style={{transform: `translateX(-${curr*250}px)`}}>
                        {
                            comicsData?.data?.results.map((comic, key) => {
                                return (
                                    <ComicCard  title={comic.title} imgUrl={comic.thumbnail.path} extension={comic.thumbnail.extension} key={key}/>
                                )
                            })
                        }
                    </div>  
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}       
                        >
                        <div className="absolute inset-0 flex items-center justify-between">
                            <button onClick={prev} className="h-full w-32 shadow bg-gradient-to-r from-black">
                                <span className="text-white">{"<"}</span>
                            </button>
                            <button onClick={next} className="h-full w-32 shadow bg-gradient-to-l from-black">
                                <span className="text-white">{">"}</span>
                            </button>
                        </div>
                    </motion.div>             
                </section>                
        </section>
    )
}

export default HeroDetails