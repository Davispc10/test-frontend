import React from "react"
import Pagination from "../organisms/Pagination"
import { ChangeEvent } from "react"
import { HomeInput } from "../atoms/HomeInput"
import { HeroesList } from "../organisms/HeroesList"

interface HomeProps {
  search: string,
  isLoading: boolean,
  data: any,
  currentPage: number,
  lastPage: number,
  handleGetData: () => void,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void
}

const HomeTemplate = ({ ...props } : HomeProps) => {
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <HomeInput search={props.search} handleInput={props.handleInput} />
      <HeroesList data={props.data} isLoading={props.isLoading} />
      <Pagination
        currentPage={props.currentPage}
        lastPage={props.lastPage}
        maxLength={5}
        setCurrentPage={props.setCurrentPage}
        onClick={props.handleGetData}
      />
    </main>
  )
}

export default HomeTemplate;