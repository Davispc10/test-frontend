import { ImageIcon } from "../atoms/ImageIcon"
import searchIcon from "@/assets/icons/search.svg"
import xIcon from "@/assets/icons/x.svg"
import { TextInput } from "../atoms/TextInput"
import { Dispatch, SetStateAction } from "react"

type Props = {
  keyword: string
  setKeyword: Dispatch<SetStateAction<string>>
}

export function SearchBar({ setKeyword, keyword }: Props) {
  return (
    <div className="my-16 flex w-full justify-center">
      <ImageIcon iconFileName={searchIcon} position="left" />

      <TextInput setKeyword={setKeyword} keyword={keyword} />

      <ImageIcon iconFileName={xIcon} position="right" />
    </div>
  )
}
