import { Dispatch, SetStateAction } from "react"

type Props = {
  setKeyword: Dispatch<SetStateAction<string>>
  keyword: string
}

export function TextInput({ keyword, setKeyword }: Props) {
  return (
    <input
      type="text"
      name="keyword"
      id="keyword"
      className="h-12 w-1/2 rounded-3xl bg-zinc-800 px-12 shadow-lg shadow-black focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-600"
      value={keyword}
      onChange={(e) => setKeyword(e.currentTarget.value)}
    />
  )
}
