import React from "react"
import { HeroesList } from "../organisms/HeroesList"

interface HomeProps {
  data: any,
}

const FavHeroesTemplate = ({ ...props } : HomeProps) => {
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <HeroesList data={props.data} isLoading={false} />
    </main>
  )
}

export default FavHeroesTemplate;