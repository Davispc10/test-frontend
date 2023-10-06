import HeroCard from "./HeroCard"
import useMarvelHeroes from "@/hooks/useMarvelHeroes-list.hook"

const HeroSection = () => {
    const {data,error,isLoading} = useMarvelHeroes()
    if(isLoading)
        return
    console.log(data)
    return(
        <section className="bg-gray-400 w-full h-[600px]">

        </section>
    )
}

export default HeroSection