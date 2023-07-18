import React from "react"
import { useState } from "react"
import { useQuery } from "react-query"
import { getAllHeroes } from "../services/apiServices"

import HeroesList from "../components/Heroes/HeroesList"
import Pagination from "../components/Pagination/Pagination"
import { HeroData, HeroProps } from "../utils/interfaces"
import { MagnifyingGlass, SpinnerGap } from "@phosphor-icons/react"

const Home = () => {
  const [search, setSearch] = useState<string>("")
  const [totalPages, setTotalPages] = useState(157)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const lastPage = Math.ceil(totalPages / itemsPerPage)
  const offset = (itemsPerPage * currentPage) - 10

  const { data, refetch } = useQuery<HeroData, Error>({
    queryKey: ["heroes", currentPage],
    queryFn: () => getAllHeroes(offset, itemsPerPage, search),
    onSuccess: (result) => {
      setTotalPages(result.total)
    }
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleGetData = () => {
    void refetch()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void refetch()
  }

  return (
    <div className='flex flex-col w-screen h-screen p-2 font-bangers'>
      <main className="flex flex-col justify-center items-center w-full">
        <div className="mb-4">
          <form className="flex items-center" onSubmit={handleSubmit}>
            <input
              name="search-user"
              className="border-y px-1 border-black focus:border-red-500 focus:outline-none rounded-sm"
              type="text"
              placeholder="find your hero"
              value={search}
              onChange={handleInput}
            />
            <button className="ml-2 p-1 bg-red-500 rounded-md hover:bg-red-700 duration-300">
              <MagnifyingGlass className="text-xl" />
            </button>
          </form>
        </div>
        <div className="heroCard">
          {data ? (
            data.results.map((hero: HeroProps) => (
              <HeroesList {...hero} key={hero.id} />
            ))
          ) : (
            <div className="w-[400px] h-[500px] mb-6">
              <SpinnerGap className="h-12 w-12 animate-spin text-red-500" />
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          maxLength={5}
          setCurrentPage={setCurrentPage}
          onClick={handleGetData}
        />
      </main>
    </div>
  )
}

export default Home