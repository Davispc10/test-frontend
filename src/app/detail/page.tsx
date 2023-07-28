'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import LayoutDetail from '@/components/layouts/detail'
import { useLazyGetComicsQuery } from '@/store/services/marvel'
import Comic from '@/components/comic'

import { ComicProps } from '../../components/comic'

type ComicDetailProps = ComicProps & {
  id: number;
  image: string;
}

type CharacterProps = {
  name: string
  thumbnail: string
  description: string
  comics: any
  series: any
  stories: any
  events: any
  urls: any
}

export default function Detail() {
  const [comics, setComics] = useState([])
  const [localDetail, setLocalDetail] = useState<CharacterProps>()
  const [getComics, { data, isFetching }] = useLazyGetComicsQuery()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detail = localStorage.getItem('detail')
      const json = JSON.parse(detail ?? '')
      setLocalDetail(json)
    }
  }, [])

  useEffect(() => {
    if (!isFetching && !comics?.length) {
      getComics({ url: localDetail?.comics })
    }
  }, [])

  useEffect(() => {
    if (isFetching && !comics?.length) {
      setComics(data)
    }
  }, [data, isFetching, comics])

  useEffect(() => {
    const time = setTimeout(() => {
      if (typeof localDetail === 'object' && !Object.keys(localDetail).length) {
        location.href = '/'
  
        return
      }
    }, 100)

    return () => clearInterval(time)
  }, [localDetail])

  return (
    <LayoutDetail>
      {!localDetail ? (
        <div className="loader" />
      ) : (
        <div className="detail">
          <div className="image w-full h-96 lg:h-[38rem] xl:h-[48rem] relative">
            <Image
              src={localDetail?.thumbnail}
              alt={localDetail?.name}
              style={{
                objectFit: 'contain',
              }}
              fill
            />
          </div>

          <div className="description w-full text-black">
            <h1>{localDetail?.name}</h1>

            <p className="text">{localDetail?.description}</p>

            <div className="series">
              <h2>
                Series: <span className='font-bold'>{localDetail?.series?.available}</span>
              </h2>

              {localDetail?.series?.items.map((item: string) =>
                <p className="mt-2" key={item}>{item}</p>
              )}
            </div>

            <div className="events">
              <h2>
                Events: <span className='font-bold'>{localDetail?.events?.available}</span>
              </h2>

              {localDetail?.events?.items.map((item: string) =>
                <p className="mt-2" key={item}>{item}</p>
              )}
            </div>

            <div className="urls">
              <h2>
                More Information:
                <span className='font-bold'>
                  {localDetail?.urls?.available}
                </span>
              </h2>

              <ul>
                {localDetail?.urls?.map((item: { url: string, type: string }) => (
                  <li key={item.url}>
                    <a className='link' href={item.url} target='_blank'>
                      {item.type}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {data && (
            <div className="comics w-full">
              <h2 className='mb-4'>Comics</h2>
              <div className="comics-container">
                {data.map((item: ComicDetailProps) => (
                  <Comic
                    title={item.title}
                    format={item.format}
                    thumbnail={item.image}
                    key={item.id}
                  />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </LayoutDetail>
  )
}
function useMemo() {
  throw new Error('Function not implemented.')
}

