import { FC } from "react"
import { ArrowUUpLeft } from "@phosphor-icons/react"
import { HeroProps } from "../../utils/interfaces"
import { marvelLogo } from "../../utils/utils"
import { useRouter } from "next/router"

export const HeroDetails: FC<HeroProps> = ({...props}) => {
  const router = useRouter()

  return (
    <div className="grid h-full border-4 border-black rounded-md bg-red-900">
      <div className="grid-row-2 p-4 rounded-md bg-red-800">
        <div className="flex flex-col items-center justify-center">
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null 
              currentTarget.src=`${marvelLogo}`
            }}
            className="w-44 h-44 border-2 border-slate-800 rounded-full mb-4"
            src={`${props.thumbnail!.path}.jpg`}
            alt=""
          />
          <p className="text-center text-4xl">
            {props.name}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-justify">
            Comics: 
          </p>
        </div>
      </div>
      <div className="grid-row-1 border-y-2 border-black bg-red-500 p-6 rounded-md grid place-items-center">
        <p className="text-center">
          {props.description}
        </p>
      </div>
      <div className="grid grid-row-1 place-items-center">
        <button
          className="flex justify-center border-y border-black items-center w-14 my-2 rounded-full bg-red-900 p-2 hover:bg-red-700 duration-200"
          onClick={() => router.back()}
        >
          <ArrowUUpLeft className="text-3xl" /> 
        </button>
      </div>
    </div>
  )
}