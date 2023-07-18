import axios from "axios"
import { useQuery } from "react-query"
import { ArrowUUpLeft, SpinnerGap } from "@phosphor-icons/react"
import { BASE_URL, defaultDescription, generateMD5Hash, marvelLogo } from "../../utils/utils"
import React from "react"
import { useRouter } from "next/router"

const Hero = () => {
  const publicKey: string = process.env.NEXT_PUBLIC_PUBLIC_KEY!
  const privateKey: string = process.env.NEXT_PUBLIC_PRIVATE_KEY!

  const router = useRouter()
  const stringToHash = `1${privateKey}${publicKey}`
  const md5Hash = generateMD5Hash(stringToHash)
  const id = Number(router.query.id)


  const getData = async () => {
    const response = await axios.get(`${BASE_URL}/characters/${id}?ts=1&apikey=${publicKey}&hash=${md5Hash}`)
    const image: string = response.data.data.results[0].thumbnail.path

    if (image.includes('not_available')) {
      response.data.data.results[0].thumbnail.path = marvelLogo
    }

    if (response.data.data.results[0].description === '') {
      response.data.data.results[0].description = defaultDescription
    }

    return response.data.data.results[0]
  }

  const { data } = useQuery({
    queryKey: ['heroInfo', id],
    queryFn: getData,
    refetchOnMount: 'always',
    staleTime: 0,
  })

  return (
    <div className="w-11/12 h-[600px] self-center bg-red-200 p-1 rounded-md font-bangers">
      {data ? (
        <div className="grid h-full border-4 border-black rounded-md bg-red-900">
          <div className="grid-row-2 p-4 rounded-md bg-red-800">
            <div className="flex flex-col items-center justify-center">
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null // prevents looping
                  currentTarget.src=`${marvelLogo}`
                }}
                className="w-44 h-44 border-2 border-slate-800 rounded-full mb-4"
                src={`${data.thumbnail.path}.jpg`}
                alt=""
              />
              <p className="text-center text-4xl">
                {data.name}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-justify">
                Comics: {data.comics.available}
              </p>
            </div>
          </div>
          <div className="grid-row-1 border-y-2 border-black bg-red-500 p-6 rounded-md grid place-items-center">
            <p className="text-center">
              {data.description}
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
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <SpinnerGap className="text-8xl animate-spin text-red-500" /> 
        </div>
      )}
    </div>
  )
}

export default Hero