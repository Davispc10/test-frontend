import { ImageIcon } from "../atoms/ImageIcon"
import leftArrowIcon from "@/assets/icons/leftArrow.svg"
import rightArrowIcon from "@/assets/icons/rightArrow.svg"
import { PaginationNumber } from "../atoms/PaginationNumber"

type Props = {
  totalPages: number
}

export function PaginationBar({ totalPages }: Props) {
  return (
    <div className="flex w-64 flex-row justify-between py-8">
      <ImageIcon iconFileName={leftArrowIcon} />
      <PaginationNumber number={1} active />
      <PaginationNumber number={2} />
      <PaginationNumber number={3} />
      <PaginationNumber />
      <PaginationNumber number={totalPages} />
      <ImageIcon iconFileName={rightArrowIcon} />
    </div>
  )
}
