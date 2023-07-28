import React, { ChangeEvent } from "react"

interface HomeInputProps {
  search: string,
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void
}

export const HomeInput = ({...props}: HomeInputProps) => {
  return (
    <input
      name="search-user"
      className="border-y-2 px-1 h-10 w-2/4 mb-6 mt-2 md:w-1/4 bg-red-500 border-black focus:border-red-500 focus:outline-none rounded-md"
      type="text"
      placeholder="find your hero"
      value={props.search}
      onChange={props.handleInput}
    />
  )
}