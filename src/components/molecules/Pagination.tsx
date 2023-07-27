'use client'
import React from "react";
import PageItem from "../atoms/PageItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changePage } from "@/redux/features/querySlice";

const Pagination = () => {
  const dispatch = useDispatch()
  const page = useSelector((state: RootState) => state.query.page)
  const totalPages = useSelector((state: RootState) => state.query.pageTotal)

  const handlePageAdvance = () => {
    dispatch(changePage({ page: page + 1 }));
  };

  const handlePageReturn = () => {
    dispatch(changePage({ page: page - 1 }));
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = page; i <= page; i++) {
      pages.push(
        <PageItem
          key={`${i}_${page}`}
          isActive={page === i}
          value={i + 1}
        />
      );
    }

    return pages;
  };

  return (
    <div className="w-full flex items-end justify-end">
      <div className="flex gap-2 items-center justify-center">
        {
          page > 0 &&
          <button className="outline-none" onClick={handlePageReturn}>&larr;</button>
        }
        {renderPagination()}
        {
          totalPages > page &&
          <button className="outline-none" onClick={handlePageAdvance}>&rarr;</button>
        }
      </div>
    </div>
  );
};

export default Pagination;
