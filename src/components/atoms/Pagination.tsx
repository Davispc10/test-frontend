import ReactPaginate from 'react-paginate'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

interface IPagination {
  pageCount: number
  setPage: (page: number) => void
  pageCurrent: number
}

interface IPageClick {
  selected: number
}

export function Pagination({ pageCount, setPage, pageCurrent }: IPagination) {
  const handlePageClick = ({ selected }: IPageClick) => {
    const currentPage = selected + 1
    setPage(currentPage)
  }

  return (
    <div className="flex select-none items-center justify-center">
      <ReactPaginate
        previousLabel={<CaretLeft size={24} weight="bold" />}
        nextLabel={<CaretRight size={24} weight="bold" />}
        breakClassName={'break'}
        pageCount={pageCount}
        marginPagesDisplayed={0}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'chevron'}
        previousLinkClassName={'chevron-link'}
        nextClassName={'chevron'}
        nextLinkClassName={'chevron-link'}
        activeClassName={'active'}
        initialPage={pageCurrent - 1}
      />
    </div>
  )
}
