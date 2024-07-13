import { ImageIcon } from "../atoms/ImageIcon"
import searchIcon from "@/assets/icons/search.svg"
import xIcon from "@/assets/icons/x.svg"
import { TextInput } from "../atoms/TextInput"

export function SearchBar() {
  return (
    <div className="my-16 flex w-full justify-center">
      <ImageIcon iconFileName={searchIcon} position="left" />

      <TextInput />

      <ImageIcon iconFileName={xIcon} position="right" />
    </div>
  )
}
