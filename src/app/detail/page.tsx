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

export default function Detail() {
  const [comics, setComics] = useState([])
  const localDetail = window.localStorage.getItem('detail')
  const detail = JSON.parse(localDetail)
  const [getComics, { data, isFetching }] = useLazyGetComicsQuery()

  useEffect(() => {
    if (!Object.keys(detail).length) {
      window.location.href = '/'

      return
    }
  }, [detail])

  useEffect(() => {
    if (!isFetching && !comics?.length) {
      getComics({ url: detail.comics })
    }
  }, [])

  useEffect(() => {
    if (isFetching && !comics?.length) {
      setComics(data)
    }
  }, [data, isFetching, comics])

  return (
    <LayoutDetail>
      <div className="detail">
        <div className="image w-full h-96 lg:h-[38rem] xl:h-[48rem] relative">
          <Image
            src={detail.thumbnail}
            alt={detail.name}
            style={{
              objectFit: 'contain',
            }}
            fill
          />
        </div>

        <div className="description w-full text-black">
          <h1>{detail.name}</h1>

          <p className="text">{detail.description}</p>

          <div className="series">
            <h2>
              Series: <span className='font-bold'>{detail.series.available}</span>
            </h2>

            {detail.series.items.map((item: string) =>
              <p className="mt-2" key={item}>{item}</p>
            )}
          </div>

          <div className="events">
            <h2>
              Events: <span className='font-bold'>{detail.events.available}</span>
            </h2>

            {detail.events.items.map((item: string) =>
              <p className="mt-2" key={item}>{item}</p>
            )}
          </div>

          <div className="urls">
            <h2>
              More Information:
              <span className='font-bold'>
                {detail.urls.available}
              </span>
            </h2>

            <ul>
              {detail.urls.map((item: { url: string, type: string }) => (
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
    </LayoutDetail>
  )
}
function useMemo() {
  throw new Error('Function not implemented.')
}

