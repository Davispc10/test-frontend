import { L_ELLIPISIS, R_ELLIPISIS } from "@/constants/Ellipisis";
import Link from "next/link";
import React from "react";

type paginationProps = {
  pages: number[];
  isCurrentPage: (n: number) => boolean;
  searchByName: string | undefined;
};

const PaginationTemplate = ({
  pages,
  isCurrentPage,
  searchByName,
}: paginationProps) => {
  return (
    <ul data-cy="pagination" className="bg-slate-200 flex w-fit gap-3">
      {pages.map((page) => {
        if (page === L_ELLIPISIS || page === R_ELLIPISIS) {
          return (
            <li key={page} className="p-2 w-10 cursor-default">
              ...
            </li>
          );
        }
        return (
          <li
            className={
              isCurrentPage(page)
                ? " bg-slate-600 w-10 cursor-pointer block mx-auto text-center text-neutral-50"
                : "w-10 hover:bg-slate-300 mx-auto block text-center cursor-pointer "
            }
            key={page}
          >
            <Link
              data-cy={`pagination-${page}`}
              className="block p-2 w-full h-full"
              href={`/?searchByName=${
                searchByName ? searchByName : ""
              }&page=${page}`}
            >
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PaginationTemplate;
