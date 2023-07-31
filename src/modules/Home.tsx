'use client'

import 'src/styles/pagination.css'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { descriptionVerifier, thumbnailVerifier } from '../utils/helpers'
import Layout from '@/components/Layout'
import HeroCard from '@/components/HeroCard'
import heroService from '@/services/heroService'
import Link from 'next/link'
import ReactPaginate from 'react-paginate'

function Home() {
  const [heroes, setHeroes] = React.useState([])
  const [filter, setFilter] = React.useState<string>('')
  const [loading, setLoading] = React.useState(true)
  const [offset, setOffset] = React.useState(0)

  const { data, refetch } = useQuery(
    ['heroes', offset],
    () => heroService.list(offset, filter),
    {
      onSuccess: ({ data }: any) => {
        const information = data.data.results
        setHeroes(information)
        setLoading(false)
      },
      retry: false,
      refetchOnWindowFocus: false,
      select: (data) => data,
    }
  )

  // const ls = localStorage.getItem('filter') as string
  // console.log(localStorage);
  // if (ls){
  //   console.log(ls)
  //   setFilter(ls)
  //   // refetch()
  // }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    setOffset(0)
    localStorage.setItem('filter', filter)
    refetch()
  }

  const handlePageChange = (selected: number) => {
    setOffset(selected * data?.data.data.limit)
    refetch()
  }

  return (
    <Layout>
      <div className="h-full p-[8px]">
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center w-full mb-8"
        >
          <input
            className="px-4 py-2 border text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            onChange={({ target }) => setFilter(target.value)}
            value={filter}
            name="filter"
            placeholder="Search hero by name"
          />

          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Search
          </button>
        </form>
        <div className="mt-[20px] px-2">
          {loading ? (
            // Show the loader while data is being fetched
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : heroes.length === 0 ? (
            "There's no heroes with this name"
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {heroes.map((el: any) => (
                  <Link
                    className="w-300 cursor-pointer p-1 inline-block"
                    key={el.id}
                    href={`/hero/${el.id}`}
                  >
                    <HeroCard
                      name={el.name}
                      description={descriptionVerifier(el.description)}
                      thumbnail={`${thumbnailVerifier(
                        `${el.thumbnail.path}.${el.thumbnail.extension}`
                      )}`}
                      comics={el.comics.available}
                    />
                  </Link>
                ))}
              </div>
              <ReactPaginate
                className="pagination flex m-auto text-lg justify-around items-center w-2/4 mt-[20px]"
                onPageChange={(selected) => handlePageChange(selected.selected)}
                pageCount={Math.ceil(
                  data?.data?.data.total / data?.data?.data.limit
                )}
                initialPage={offset / data?.data?.data.limit}
                pageRangeDisplayed={3}
                previousLinkClassName="border-2 rounded border-red-500 p-[8px] hover:bg-red-500 hover:text-white"
                nextLinkClassName="border-2 rounded border-red-500 p-[8px] hover:bg-red-500 hover:text-white"
                pageClassName="border border-red-500 rounded px-[8px] hover:bg-red-500 hover:text-white"
                previousLabel="« Previous"
                nextLabel="Next »"
                breakLabel="..."
                activeClassName="bg-red-500 text-white"
                activeLinkClassName="bg-red-500 text-white"
                breakClassName="text-red-500"
                disabledClassName="opacity-50 pointer-events-none"
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Home
