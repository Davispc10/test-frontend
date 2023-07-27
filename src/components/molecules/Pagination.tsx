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
    <div className="w-full flex items-center justify-center">
      <div className="flex gap-2 items-center justify-center">
        {
          page > 0 &&
          <button onClick={handlePageReturn}>Anterior</button>
        }
        {renderPagination()}
        {
          totalPages > page &&
          <button onClick={handlePageAdvance}>Próximo</button>
        }
      </div>
    </div>
  );
};

export default Pagination;
