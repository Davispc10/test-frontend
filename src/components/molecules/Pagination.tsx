'use client'

import { PaginationProps } from "@/utils/types";
import React, { useState } from "react";
import PageItem from "../atoms/PageItem";
import Ellipsis from "../atoms/Ellipsis";

const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(props.page);
  const totalPages = props.totalPages;
  const pageRangeDisplayed = 4;

  const setPage = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];

    pages.push(
      <PageItem
        key={1}
        isActive={currentPage === 1}
        onClickFunction={() => setPage(1)}
        value={1}
      />
    );

    if (currentPage > pageRangeDisplayed + 2) {
      pages.push(<Ellipsis key={'firstEllipsis'} />);
    }

    const startPage = Math.max(2, currentPage - Math.floor(pageRangeDisplayed / 2));
    const endPage = Math.min(totalPages - 1, startPage + pageRangeDisplayed - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageItem
          key={i}
          isActive={currentPage === i}
          onClickFunction={() => setPage(i)}
          value={i}
        />
      );
    }

    if (currentPage + pageRangeDisplayed + 1 < totalPages) {
      pages.push(<Ellipsis key={'lastEllipsis'} />);
    }

    pages.push(
      <PageItem
        key={totalPages}
        isActive={currentPage === totalPages}
        onClickFunction={() => setPage(totalPages)}
        value={totalPages}
      />
    );

    return pages;
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex gap-2 items-center justify-center">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Pagination;
