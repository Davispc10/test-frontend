import { FC } from "react"
import { HeroProps } from "../utils/interfaces"
import { marvelLogo } from "../utils/utils"

export const HeroCard: FC<HeroProps> = ({...props}) => {
  const image: string = props.image

  if (image.includes('not_available')) {
    props.image = marvelLogo
  }

  return (
    <div className="w-full h-full">
      <div className={props.className}>
        <div className="">
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src=`${marvelLogo}`;
            }} 
            src={`${props.image}.jpg`}
            className="h-32 w-32 xl:h-52 xl:w-52 mb-2 rounded-full border border-red-500" 
            alt="" />
        </div>
        <div className="">
          <p className="text-md xl:text-2xl xl:text-center font-semibold">
            {props.name}
          </p>
        </div>
      </div>
    </div>
  )
}