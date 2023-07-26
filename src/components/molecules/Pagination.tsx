'use client'

import { PaginationProps } from "@/utils/types";
import React, { useState } from "react";

const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(props.page);
  const totalPages = props.totalPages;
  const pageRangeDisplayed = 4;

  const setPage = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
    // You can also make your API call here to fetch data for the selected page.
  };

  const renderPagination = () => {
    const pages = [];

    // Show the first page link
    pages.push(
      <span
        key={1}
        onClick={() => setPage(1)}
        className={`
        ${currentPage === 1 ? "font-bold" : ""}
        cursor-pointer
        `}
      >
        1
      </span>
    );

    // Show the ellipsis if there are pages in between
    if (currentPage > pageRangeDisplayed + 2) {
      pages.push(<span key="firstEllipsis">...</span>);
    }

    // Calculate the range of pages to display
    const startPage = Math.max(2, currentPage - Math.floor(pageRangeDisplayed / 2));
    const endPage = Math.min(totalPages - 1, startPage + pageRangeDisplayed - 1);

    // Show the pages within the range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          key={i}
          onClick={() => setPage(i)}
          className={`
          ${currentPage === i ? "font-bold" : ""}
          cursor-pointer
          `}
        >
          {i}
        </span>
      );
    }

    // Show the ellipsis if there are pages in between
    if (currentPage + pageRangeDisplayed + 1 < totalPages) {
      pages.push(<span key="lastEllipsis">...</span>);
    }

    // Show the last page link
    pages.push(
      <span
        key={totalPages}
        onClick={() => setPage(totalPages)}
        className={`
        ${currentPage === totalPages ? "font-bold" : ""}
        cursor-pointer
        `}
      >
        {totalPages}
      </span>
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
