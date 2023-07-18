import React from "react"
import { useRouter } from "next/router"
import { getOneHero } from "../../services/apiServices"
import { useQuery } from "react-query"

import { SpinnerGap } from "@phosphor-icons/react"
import { HeroDetails } from "../../components/Heroes/HeroDetails"

const Hero = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  const { data } = useQuery({
    queryKey: ['heroInfo', id],
    queryFn: () => getOneHero(id),
    refetchOnMount: 'always',
    staleTime: 0,
  })

  return (
    <div className="w-11/12 h-[600px] self-center bg-red-200 p-1 rounded-md font-bangers">      
      {data ? (
        <HeroDetails {...data} />
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <SpinnerGap className="text-8xl animate-spin text-red-500" /> 
        </div>
      )}
    </div>
  )
}

export default Hero