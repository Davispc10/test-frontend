import { HeroesListReducer } from "@/types/heroes";
import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
type Props = {
  onChange: (event: { selected: number }) => void;
};

const Pagination = ({ onChange }: Props) => {
  const { page, totalPages } = useSelector(
    (state: HeroesListReducer) => state.heroesListReducer
  );

  return (
    <div className="w-full mt-8 flex items-center justify-center">
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
        forcePage={page}
        breakLabel="..."
        nextLabel="próximo >"
        previousLabel="< anterior"
        onPageChange={onChange}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="pagination-disabled"
      />
    </div>
  );
};

export default Pagination;
