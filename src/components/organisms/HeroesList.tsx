import React from "react"
import { CircleNotch } from "@phosphor-icons/react"
import HeroCard from "../molecules/HeroCard"
import { HeroProps } from "../../utils/interfaces"

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
          <HeroCard {...hero} key={hero.id} />
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