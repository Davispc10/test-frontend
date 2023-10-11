import { useEffect, useState } from "react"
import HeroCard from "./HeroCard"
import useMarvelHeroes from "@/hooks/useMarvelHeroes-list.hook"

const HeroSection = () => {
    const [offset, setOffset] = useState(0)

    const {data,error,isLoading} = useMarvelHeroes(offset)

    const [search, setSearch] = useState('')
    
    useEffect(() => {
        console.log("foi")
    }, [offset]);

    console.log(offset)

    const filteredResults = search.length > 0 ? data?.filter(data => data.name.toUpperCase().includes(search.toUpperCase())) : data

    if(isLoading)
        return
    console.log(search)
    return(
        <section className="bg-hero-pattern bg-no-repeat bg-center bg-cover w-full h-full">
            <div className="h-[1400px]">
                <div className="relative w-full flex items-center flex-wrap p-6">
                    <input 
                        name="search"
                        type="text"
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar..."
                        value={search}
                        />
                        
                </div>
                <div className="flex items-center justify-between w-full max-w-[1246px] px-[15px] mx-auto">          
                    <div className="p-4 md:px-16 md:py-8 grid grid-cols-2 md:grid-cols-6 gap-8">
                        {
                            search.length > 0 ? (
                                filteredResults?.map((hero, key: number) => (
                                    <HeroCard key={key} id={hero.id}  img={hero.thumbnail.path} name={hero.name}/>
                                ))
                            ) : (
                                data?.map((hero, key: number) => (
                                    <HeroCard key={key} id={hero.id}  img={hero.thumbnail.path} name={hero.name}/>
                                ))
                            )
                        }
                    </div>
                    
                </div>    
                <div className="w-full items-center">
                    <button className="h-8 w-8 bg-amber-300"></button>
                    <button className="h-8 w-8 bg-amber-300" onClick={e => setOffset(20)}></button>
                </div>       
            </div>   
        </section>
    )
}

export default HeroSection