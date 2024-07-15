import { ImageIcon } from "../atoms/ImageIcon"
import leftArrowIcon from "@/assets/icons/leftArrow.svg"
import rightArrowIcon from "@/assets/icons/rightArrow.svg"
import { PaginationNumber } from "../atoms/PaginationNumber"

type Props = {
  totalPages: number
  page: number
  nextPage: () => void
  previousPage: () => void
}

export function PaginationBar({
  totalPages,
  page,
  nextPage,
  previousPage,
}: Props) {
  return (
    <div
      id="pagination-bar"
      className="flex flex-row gap-4 self-end py-8 pr-32"
    >
      <div onClick={() => previousPage()}>
        <ImageIcon iconFileName={leftArrowIcon} />
      </div>

      <PaginationNumber number={page + 1} active />

      <div onClick={() => nextPage()}>
        <ImageIcon iconFileName={rightArrowIcon} />
      </div>
    </div>
  )
}
