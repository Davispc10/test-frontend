import { useEffect, useState } from "react"
import HeroCard from "./HeroCard"
import useMarvelHeroes from "@/hooks/useMarvelHeroes-list.hook"
import { off } from "process"

const HeroSection = () => {
    const [currentSearch, setCurrentSearch] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [offset, setOffset] = useState<number>(0)
    const { data, error, isLoading } = useMarvelHeroes(search, offset)

    if (isLoading)
        return

    const increase = () => setOffset(offset + 20 >= Math.ceil(data?.total? data?.total : 0) ? offset : offset + 20);
    const decrease = () => setOffset(offset - 20 <= 0 ? 0 : offset - 20);

    return (
        <section className="bg-hero-pattern bg-no-repeat bg-center bg-cover w-full h-full">
            <div className="h-[1400px]">
                <div className="px-14 flex items-center flex-wrap p-6">
                    <input className="inline-flex rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                            name="search"
                            type="text"
                            onChange={e => setCurrentSearch(e.target.value)}
                            placeholder="Buscar..."
                            value={currentSearch} 
                            />
                    <button type="submit" 
                            className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-amber-300 px-4 py-2 font-medium text-white shadow-sm hover:bg-amber-300 focus:outline-none focus:ring-2 focus:bg-amber-300 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                            onClick={() => setSearch(currentSearch)}>Search</button>
                </div>
                

                <div className="flex items-center justify-between w-full max-w-[1246px] px-[15px] mx-auto">
                    <div className="md:px-2 md:py-8 grid grid-cols-2 md:grid-cols-6 gap-8">
                        {
                            data?.results.map((hero: any, key: number) => (
                                <HeroCard key={key} id={hero.id} extension={hero.thumbnail.extension} img={hero.thumbnail.path} name={hero.name} />
                            ))
                        }
                    </div>

                </div>
                <div className="w-full flex gap-2 items-center px-14">
                    <div className="flex items-center bg-white h-12 w-32 rounded-md">
                        <p className="text-red-700 w-full inline-block text-center align-middle font-bold">{`Page: ${data?.offset? data?.offset/20+1 : 1} of ${Math.ceil(data?.total ? data?.total/20 : 0)}`}</p>
                    </div>
                    <button className="h-12 w-24 bg-amber-300 rounded-md" onClick={decrease}>
                        <p className="text-white font-bold">Previous</p>
                    </button>
                    
                    <button className="h-12 w-24 bg-amber-300 rounded-md" onClick={increase}>
                        <p className="text-white font-bold">Next</p>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection