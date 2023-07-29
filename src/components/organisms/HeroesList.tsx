import React from "react"
import { CircleNotch } from "@phosphor-icons/react"
import HeroCard from "../molecules/HeroCard"
import { HeroProps } from "../../utils/interfaces"
import Link from "next/link"

interface HeroesProps {
  data: any,
  isLoading: boolean,  
}

export const HeroesList = ({data, isLoading} : HeroesProps) => {
  return (
    <div className={`${data?.results.length > 0 ? "heroCard" : "loadingCard"}`}>
      {isLoading && (
        <CircleNotch className="text-8xl animate-spin text-red-500" />
      )}
      {data && (
        data.results.map((hero: HeroProps) => (
          <Link
            className='hover:bg-red-600 border-y border-red-900 rounded-lg duration-300'
            href={`/hero/${hero.id}`}
            key={hero.id}> 
              <HeroCard 
                name={hero.name} 
                image={hero.thumbnail!.path} 
                key={hero.id}              
              />
          </Link>
        ))
      )}
      {data?.results.length === 0 && !isLoading && (
        <p className="text-3xl">
          No heroes found!
        </p>
      )}
    </div>
  )
}