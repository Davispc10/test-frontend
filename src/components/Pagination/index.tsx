"use client";

import "react-responsive-pagination/themes/classic.css";

import ResponsivePagination from "react-responsive-pagination";
import { useRouter } from "next/navigation";

interface PropsComponentPagination_I {
  count: number;
  itemsPerPage: number;
  indexPage: number;
}

export const ComponentPagination = ({
  count,
  itemsPerPage,
  indexPage,
}: PropsComponentPagination_I) => {
  const navigate = useRouter();
  return (
    <ResponsivePagination
      current={indexPage}
      total={Math.ceil(count / itemsPerPage)}
      linkHref="omit"
      pageItemClassName="cursor-pointer"
      onPageChange={(page) => {
        navigate.push(`/?pg=${page}`);
      }}
    />
  );
};
